# Deploy Burmese STEM AI to EC2 with Docker and HTTPS

This guide is configured for the current EC2 endpoint:

- Public IPv4: `18.208.163.135`
- AWS public DNS: `ec2-18-208-163-135.compute-1.amazonaws.com`
- HTTPS application URL: `https://18.208.163.135`

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
chmod 400 /path/to/key.pem
ssh -i /path/to/key.pem ubuntu@18.208.163.135
```

For Amazon Linux, replace `ubuntu` with `ec2-user`.

## 3. Install Docker

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

### Amazon Linux 2023

```bash
sudo dnf update -y
sudo dnf install -y docker git
sudo systemctl enable --now docker
sudo usermod -aG docker ec2-user
```

Log out and reconnect. Confirm both commands work:

```bash
docker version
docker compose version
```

If `docker compose` is unavailable on Amazon Linux, install the Compose plugin
using Docker's Linux Compose-plugin guide in the references below. This project
requires Compose v2, not the old `docker-compose` command.

> Membership in the `docker` group grants root-equivalent access. Alternatively,
> leave the user out of that group and run deployment commands with `sudo`.

## 4. Clone and configure the application

```bash
git clone YOUR_REPOSITORY_URL
cd burmese_stem_ai
cp .env.production.example .env.production
chmod 600 .env.production
nano .env.production
chmod +x deploy.sh
```

Configure `.env.production` as follows:

```dotenv
PUBLIC_HOST=18.208.163.135
LETSENCRYPT_EMAIL=you@example.com
OPENAI_API_KEY=your-real-api-key
OPENAI_MODEL=gpt-5.4-mini
LETSENCRYPT_STAGING=0
```

Replace the email and API key. Do not add `http://`, `https://`, a port, or a
path to `PUBLIC_HOST`. The production environment file and generated
certificates are ignored by Git.

## 5. Deploy with HTTPS

Run:

```bash
./deploy.sh deploy
```

The script will:

1. Validate the settings and Docker access.
2. Build and start MongoDB, initialize it, and start Next.js.
3. Start Nginx over HTTP for certificate validation.
4. Request a short-lived Let's Encrypt certificate for `18.208.163.135`.
5. Redirect HTTP traffic to HTTPS and start automatic renewal checks.
6. Verify `https://18.208.163.135/api` and print container status.

Let's Encrypt requires IP certificates to use its short-lived profile. They are
valid for approximately six days. The Certbot container checks for renewal every
12 hours, and Nginx reloads renewed certificates every six hours.

Open the application at:

```text
https://18.208.163.135
```

Use the IP address in the HTTPS URL. The certificate is issued for the IP, so
opening `https://ec2-18-208-163-135.compute-1.amazonaws.com` produces a hostname
mismatch. The AWS hostname is still useful for SSH or plain HTTP.

### Optional staging test

To rehearse certificate issuance without using production rate limits, set:

```dotenv
LETSENCRYPT_STAGING=1
```

The resulting staging certificate is intentionally not trusted by browsers.
After testing, run `./deploy.sh stop`, set the value back to `0`, remove
`.deploy/letsencrypt`, and run the deployment again. Do not repeatedly delete
production certificates because certificate-authority rate limits apply.

## 6. Operate and update

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

### The HTTP endpoint is unreachable

- Confirm the instance is running and still has `18.208.163.135`.
- Confirm the security group allows TCP 80 from `0.0.0.0/0`.
- Confirm the subnet has an Internet Gateway route.
- Run `./deploy.sh status` and `./deploy.sh logs`.
- Test `curl -v http://18.208.163.135/api` from outside AWS.

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
Add swap temporarily, resize the instance, or build the image in CI and pull it
from a registry.

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
- [Let's Encrypt: IP certificates with Certbot](https://letsencrypt.org/2026/03/11/shorter-certs-certbot/)
- [Let's Encrypt: HTTP-01 validation](https://letsencrypt.org/docs/challenge-types/)
