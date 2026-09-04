# Deploy Burmese STEM AI to EC2 with Docker and HTTPS

This guide is configured for the current EC2 endpoint:

- Public IPv4: `107.21.91.141`
- HTTPS application URL: `https://burmesestemai.serveirc.com`

The deployment runs Next.js, MongoDB, Nginx, and Certbot with Docker Compose.
Only Nginx publishes host ports `80` and `443`. The application port `3000`
and MongoDB port `27017` remain private inside Docker.

## Important limitation of an automatically assigned public IP

The assigned public IP is not permanent. A normal **reboot** preserves it, but
AWS releases it when the instance is stopped and assigns a different address
when the instance starts again. The AWS public DNS name changes with it.

If that happens:

1. Find the new **Public IPv4 address** in the EC2 console.
2. Change `PUBLIC_HOST` in `.env.production`.
3. Stop the containers and remove the old local certificate data:

   ```bash
   ./deploy.sh stop
   sudo rm -rf .deploy/letsencrypt
   ```

4. Run `./deploy.sh deploy` again to issue a certificate for the new IP.

MongoDB data is stored in a separate Docker volume and is not removed by these
steps. Avoid stopping the instance when possible. If a stable address becomes
important later, associate an Elastic IP or use a domain with dynamic DNS.

## 1. Configure the EC2 security group

In **EC2 > Instances**, select the instance, open its **Security** tab, select
the attached security group, and edit its inbound rules:

| Type | Port | Source | Purpose |
|---|---:|---|---|
| SSH | 22 | Your public IP as `/32` | Administration |
| HTTP | 80 | `0.0.0.0/0` | Redirects and certificate validation |
| HTTPS | 443 | `0.0.0.0/0` | Public application traffic |

Do not open ports `3000` or `27017`. Restrict SSH to your own IP rather than
`0.0.0.0/0`. The default outbound rule is sufficient for downloading packages
and images, requesting certificates, and calling the OpenAI API.

The instance must be in a public subnet with a route from `0.0.0.0/0` to an
Internet Gateway. Custom network ACLs must also permit the web traffic and its
response traffic.

## 2. Connect to the instance

For Ubuntu:

```bash
chmod 400 ./EC2KeyPair.pem
ssh -i ./EC2KeyPair.pem ec2-user@ec2-107-21-91-141.compute-1.amazonaws.com
```

For Amazon Linux, replace `ubuntu` with `ec2-user`.

## 3. Configure GitHub SSH access

Create a dedicated key on the EC2 instance. Do not reuse the `.pem` key that you
use to log in to EC2:

```bash
mkdir -p ~/.ssh
chmod 700 ~/.ssh
ssh-keygen -t ed25519 \
  -C "burmese-stem-ai-ec2" \
  -f ~/.ssh/burmese_stem_ai_deploy
```

Enter a passphrase when prompted for better protection. If this server must pull
updates unattended, you may leave it empty; in that case, keep the GitHub key
read-only and protect access to the EC2 instance carefully.

Tell SSH to use this dedicated key for GitHub:

```bash
tee -a ~/.ssh/config >/dev/null <<'EOF'
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/burmese_stem_ai_deploy
  IdentitiesOnly yes
EOF

chmod 600 ~/.ssh/config
cat ~/.ssh/burmese_stem_ai_deploy.pub
```

Copy the entire displayed line. In GitHub, open the repository and go to
**Settings > Deploy keys > Add deploy key**. Give it a descriptive name, paste
the public key, and leave **Allow write access** disabled because this server
only needs to clone and pull. If you cannot manage repository deploy keys, add
it under your GitHub account's **Settings > SSH and GPG keys** instead; that
grants the key access according to your account permissions.

Test the connection:

```bash
ssh -T git@github.com
```

On the first connection, compare the displayed host-key fingerprint with
GitHub's published fingerprint before accepting it. A successful test says that
you authenticated but GitHub does not provide shell access. That command can
still return exit status `1`; this is normal for GitHub's SSH test.

If the repository belongs to an organization that enforces SAML SSO, authorize
the SSH key for that organization in GitHub before cloning.

## 4. Install Docker, Compose, and Buildx

### Ubuntu 22.04 or 24.04

Install Docker Engine and the Compose plugin from Docker's official repository:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg \
  -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

sudo tee /etc/apt/sources.list.d/docker.sources >/dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io \
  docker-buildx-plugin docker-compose-plugin git
sudo systemctl enable --now docker
sudo usermod -aG docker "$USER"
```

Log out and reconnect so the Docker group change takes effect.

### Amazon Linux 2023 — your EC2 operating system

```bash
sudo dnf update -y
sudo dnf install -y docker git
sudo systemctl enable --now docker
sudo usermod -aG docker ec2-user
```

Log out and reconnect. Confirm both commands work:

```bash
docker version
```

The Amazon Linux Docker package may not include compatible Compose and Buildx
plugins. Install both as Docker CLI plugins for `ec2-user`. These versions match
the `x86_64` architecture reported by `uname -m` on this instance.

#### Install Docker Compose manually

Your current `Docker Compose version v5.5.0` is already correct, so you may skip
this subsection. On a new instance where `docker compose version` fails, run:

```bash
mkdir -p ~/.docker/cli-plugins
curl -fSL \
  https://github.com/docker/compose/releases/download/v5.5.0/docker-compose-linux-x86_64 \
  -o ~/.docker/cli-plugins/docker-compose
chmod +x ~/.docker/cli-plugins/docker-compose
docker compose version
```

The expected result is `Docker Compose version v5.5.0`.

#### Install or upgrade Docker Buildx manually

The error `compose build requires buildx 0.17.0 or later` means Compose is
installed, but the Buildx plugin is missing or too old. Install Buildx v0.36.1
for this instance's `x86_64`/`amd64` architecture:

```bash
mkdir -p ~/.docker/cli-plugins
curl -fSL \
  https://github.com/docker/buildx/releases/download/v0.36.1/buildx-v0.36.1.linux-amd64 \
  -o ~/.docker/cli-plugins/docker-buildx

echo "48af8a397ebd60178778bf63611dbcebe5f5e7a9be90eb9147b24b9587455778  $HOME/.docker/cli-plugins/docker-buildx" \
  | sha256sum -c -

chmod +x ~/.docker/cli-plugins/docker-buildx
docker buildx version
```

The checksum command must report `OK`. The Buildx version must be `v0.17.0` or
newer; the commands above install `v0.36.1`.

Initialize and verify the default builder:

```bash
docker buildx inspect --bootstrap
docker compose version
docker info >/dev/null && echo "Docker is ready"
```

Manual CLI-plugin installations do not update automatically. Repeat these
steps with a newer stable release when maintaining the instance.

> Membership in the `docker` group grants root-equivalent access. Alternatively,
> leave the user out of that group and run deployment commands with `sudo`.

## 5. Clone and configure the application

```bash
cd ~
git clone git@github.com:Nlhmmh/burmese_stem_ai_research.git
cd ~/burmese_stem_ai_research/burmese_stem_ai
cp .env.production.example .env.production
chmod 600 .env.production
nano .env.production
chmod +x deploy.sh
```

Configure `.env.production` as follows:

```dotenv
PUBLIC_HOST=burmesestemai.serveirc.com
LETSENCRYPT_EMAIL=you@example.com
OPENAI_API_KEY=your-real-api-key
OPENAI_MODEL=gpt-5.4-mini
LETSENCRYPT_STAGING=0
```

Replace the email and API key. Do not add `http://`, `https://`, a port, or a
path to `PUBLIC_HOST`. The production environment file and generated
certificates are ignored by Git.

## 6. Deploy with HTTPS

Run:

```bash
./deploy.sh stop
./deploy.sh deploy
```

The script will:

1. Validate the settings and Docker access.
2. Build and start MongoDB, initialize it, and start Next.js.
3. Start Nginx over HTTP for certificate validation.
4. Request a short-lived Let's Encrypt certificate for EC2 public IP.
5. Redirect HTTP traffic to HTTPS and start automatic renewal checks.
6. Verify `https://burmesestemai.serveirc.com/api` and print container status.

Let's Encrypt requires IP certificates to use its short-lived profile. They are
valid for approximately six days. The Certbot container checks for renewal every
12 hours, and Nginx reloads renewed certificates every six hours.

Open the application at:

```text
https://burmesestemai.serveirc.com
```

### Optional staging test

To rehearse certificate issuance without using production rate limits, set:

```dotenv
LETSENCRYPT_STAGING=1
```

The resulting staging certificate is intentionally not trusted by browsers.
After testing, run `./deploy.sh stop`, set the value back to `0`, remove
`.deploy/letsencrypt`, and run the deployment again. Do not repeatedly delete
production certificates because certificate-authority rate limits apply.

## 7. Operate and update

Run these commands from the repository directory:

```bash
./deploy.sh status      # show container and health status
./deploy.sh logs        # follow all service logs
./deploy.sh restart     # restart Next.js and Nginx
./deploy.sh renew       # perform a certificate-renewal dry run
./deploy.sh update      # git pull --ff-only, rebuild, and redeploy
./deploy.sh stop        # stop containers but retain MongoDB data
```

Verify renewal once after the first production deployment:

```bash
./deploy.sh renew
```

MongoDB data lives in the named Docker volume
`burmese_stem_ai_prod_mongodb-data`. Do not run
`docker compose down --volumes` unless you intentionally want to delete it.

## Troubleshooting

### Build fails while opening `.deploy/letsencrypt/accounts`

An error similar to this:

```text
target init-db: failed to solve: error from sender: open .../.deploy/letsencrypt/accounts: permission denied
```

means Docker tried to include Certbot's root-owned runtime files in the image
build context. The repository's `.dockerignore` excludes `.deploy`, so first
make sure your EC2 checkout contains the current file:

```bash
cd ~/burmese_stem_ai_research/burmese_stem_ai
grep -qxF '.deploy' .dockerignore || echo '.deploy' >> .dockerignore
docker compose --env-file .env.production -f docker-compose.prod.yml build
./deploy.sh deploy
```

Do not make `.deploy/letsencrypt` world-readable and do not run
`chmod -R 777`; that directory contains the TLS private key. Excluding it from
the build context fixes the problem without weakening its permissions.

### Compose or Buildx is missing or too old

Check the two plugins independently:

```bash
docker compose version
docker buildx version
ls -l ~/.docker/cli-plugins/
```

Compose being installed does not imply that Buildx is installed. If Compose
works but deployment reports `compose build requires buildx 0.17.0 or later`,
repeat the Buildx installation in section 4. The per-user binary at
`~/.docker/cli-plugins/docker-buildx` takes precedence over an older system
plugin.

### The HTTP endpoint is unreachable

- Confirm the instance is running.
- Confirm the security group allows TCP 80 from `0.0.0.0/0`.
- Confirm the subnet has an Internet Gateway route.
- Run `./deploy.sh status` and `./deploy.sh logs`.
- Test `curl -v http://burmesestemai.serveirc.com/api` from outside AWS.

### Certificate issuance fails

- Confirm TCP port 80 is publicly reachable; HTTP-01 validation uses port 80.
- Confirm the instance's public IP has not changed.
- The Compose file pins Certbot 5.8 because webroot IP certificates require
  Certbot 5.4 or newer.
- Fix reachability before retrying to avoid rate limits.

### Nginx returns 502

```bash
./deploy.sh status
docker compose --env-file .env.production -f docker-compose.prod.yml \
  logs app mongodb init-db
```

### Docker build runs out of memory

A small free-tier instance may not have enough memory for the Next.js build.

#### Option 1: Use a larger instance or remote image build

Resize the instance, or build the image in CI and pull it from a container
registry. This is the better long-term option when builds remain slow or still
run out of memory.

#### Option 2: Add 2 GiB of swap space

First stop the current build with `Ctrl+C`. Check the available memory, existing
swap, and root-volume free space:

```bash
free -h
swapon --show
df -h /
```

Make sure the root volume has at least 2 GiB available. If `/swapfile` does not
already exist, create it and restrict its permissions:

```bash
if ! sudo test -f /swapfile; then
  sudo fallocate -l 2G /swapfile
  sudo chmod 600 /swapfile
  sudo mkswap /swapfile
fi

if ! grep -q '^/swapfile ' /proc/swaps; then
  sudo swapon /swapfile
fi
```

Make the swap file survive instance reboots. The check prevents adding the same
line to `/etc/fstab` more than once:

```bash
grep -qF '/swapfile swap swap defaults 0 0' /etc/fstab || \
  echo '/swapfile swap swap defaults 0 0' | sudo tee -a /etc/fstab
```

Verify that approximately 2 GiB of swap is active:

```bash
free -h
swapon --show
```

Then return to the application directory and retry deployment:

```bash
cd ~/burmese_stem_ai_research/burmese_stem_ai
./deploy.sh deploy
```

Swap uses disk and is much slower than RAM, but it can prevent a one-time Docker
image build from being killed on a 1 GiB instance. Monitor available disk space
because the swap file permanently consumes 2 GiB of the EBS root volume.

## Security notes

- Never commit `.env.production`, `.deploy`, SSH private keys, or API keys.
- Keep the operating system, Docker Engine, and container images patched.
- Back up the MongoDB volume before storing important data.
- Consider AWS Systems Manager Session Manager instead of public SSH.
- For a future multi-instance deployment, use an Application Load Balancer with
  AWS Certificate Manager and move state to a managed database.

## Primary references

- [AWS: security-group rules for web servers](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/security-group-rules-reference.html)
- [AWS: public IPv4 addresses and address changes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-instance-addressing.html)
- [AWS: EC2 public hostname types](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hostname-types.html)
- [AWS: install Docker on Amazon Linux 2023](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/create-container-image.html)
- [Docker: install Docker Engine](https://docs.docker.com/engine/install/)
- [Docker: install the Compose plugin](https://docs.docker.com/compose/install/linux/)
- [Docker: Buildx installation options](https://github.com/docker/buildx#installing)
- [Docker Buildx v0.36.1 release](https://github.com/docker/buildx/releases/tag/v0.36.1)
- [GitHub: generate a new SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
- [GitHub: add an SSH key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
- [GitHub: test the SSH connection](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/testing-your-ssh-connection)
- [Let's Encrypt: IP certificates with Certbot](https://letsencrypt.org/2026/03/11/shorter-certs-certbot/)
- [Let's Encrypt: HTTP-01 validation](https://letsencrypt.org/docs/challenge-types/)
