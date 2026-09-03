#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/docker-compose.prod.yml"
ENV_FILE="${ENV_FILE:-$SCRIPT_DIR/.env.production}"
DEPLOY_DIR="$SCRIPT_DIR/.deploy"
NGINX_CONFIG="$DEPLOY_DIR/nginx.conf"

log() {
  printf '[deploy] %s\n' "$*"
}

fail() {
  printf '[deploy] ERROR: %s\n' "$*" >&2
  exit 1
}

usage() {
  cat <<'EOF'
Usage: ./deploy.sh COMMAND

Commands:
  deploy       Build and deploy the current checkout, including HTTPS
  update       Pull the current Git branch with --ff-only, then deploy
  renew        Test certificate renewal and reload Nginx
  status       Show production container status
  logs         Follow production container logs
  restart      Restart the app and Nginx containers
  stop         Stop containers without deleting the MongoDB volume

Set ENV_FILE=/path/to/file to use an environment file other than
.env.production.
EOF
}

load_environment() {
  [[ -f "$ENV_FILE" ]] || fail "Missing $ENV_FILE. Copy .env.production.example and edit it first."

  # This file is controlled by the server administrator and must contain shell-safe
  # KEY=value assignments. Export them for Docker Compose and this script.
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a

  # DOMAIN remains a backward-compatible alias for older deployment files.
  PUBLIC_HOST="${PUBLIC_HOST:-${DOMAIN:-}}"
  : "${PUBLIC_HOST:?Set PUBLIC_HOST in $ENV_FILE}"
  : "${LETSENCRYPT_EMAIL:?Set LETSENCRYPT_EMAIL in $ENV_FILE}"
  : "${OPENAI_API_KEY:?Set OPENAI_API_KEY in $ENV_FILE}"
  LETSENCRYPT_STAGING="${LETSENCRYPT_STAGING:-0}"

  if [[ "$PUBLIC_HOST" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    IFS=. read -r -a octets <<< "$PUBLIC_HOST"
    for octet in "${octets[@]}"; do
      ((10#$octet <= 255)) || fail "PUBLIC_HOST is not a valid IPv4 address."
    done
  elif [[ ! "$PUBLIC_HOST" =~ ^([A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$ ]]; then
    fail "PUBLIC_HOST must be a public IPv4 address or hostname (no http:// or path)."
  fi
  [[ "$LETSENCRYPT_EMAIL" == *@*.* ]] || fail "LETSENCRYPT_EMAIL does not look valid."
  [[ "$LETSENCRYPT_STAGING" == "0" || "$LETSENCRYPT_STAGING" == "1" ]] \
    || fail "LETSENCRYPT_STAGING must be 0 or 1."
}

require_tools() {
  local buildx_version
  local minimum_buildx="0.17.0"

  command -v curl >/dev/null 2>&1 || fail "curl is not installed."
  command -v docker >/dev/null 2>&1 || fail "Docker is not installed. See README.deploy.md."
  docker compose version >/dev/null 2>&1 || fail "The Docker Compose plugin is not installed."
  docker info >/dev/null 2>&1 || fail "Cannot access Docker. Start Docker or add this user to the docker group."

  buildx_version="$(docker buildx version 2>/dev/null | sed -nE 's/.* v?([0-9]+\.[0-9]+\.[0-9]+).*/\1/p' | head -n 1)"
  [[ -n "$buildx_version" ]] || fail "Docker Buildx is not installed. See the Amazon Linux Buildx steps in README.deploy.md."
  if [[ "$(printf '%s\n' "$minimum_buildx" "$buildx_version" | sort -V | head -n 1)" != "$minimum_buildx" ]]; then
    fail "Docker Buildx $buildx_version is too old; version $minimum_buildx or later is required. See README.deploy.md."
  fi
}

compose() {
  docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" "$@"
}

render_nginx() {
  local mode="$1"
  local template="$SCRIPT_DIR/nginx/${mode}.prod.conf.template"

  [[ -f "$template" ]] || fail "Missing Nginx template: $template"
  sed "s/__PUBLIC_HOST__/$PUBLIC_HOST/g" "$template" > "$NGINX_CONFIG"
}

prepare_directories() {
  mkdir -p "$DEPLOY_DIR/certbot-www/.well-known/acme-challenge" "$DEPLOY_DIR/letsencrypt"
  chmod 700 "$DEPLOY_DIR/letsencrypt"
}

certificate_exists() {
  [[ -s "$DEPLOY_DIR/letsencrypt/live/$PUBLIC_HOST/fullchain.pem" \
    && -s "$DEPLOY_DIR/letsencrypt/live/$PUBLIC_HOST/privkey.pem" ]]
}

issue_certificate() {
  local staging_args=()
  local identifier_args=()
  if [[ "$LETSENCRYPT_STAGING" == "1" ]]; then
    staging_args+=(--staging)
    log "Using the Let's Encrypt staging environment (the certificate will not be browser-trusted)."
  fi

  if [[ "$PUBLIC_HOST" =~ ^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
    identifier_args+=(--ip-address "$PUBLIC_HOST" --preferred-profile shortlived)
    log "Requesting a short-lived IP certificate for $PUBLIC_HOST"
  else
    identifier_args+=(--domain "$PUBLIC_HOST")
    log "Requesting a domain certificate for $PUBLIC_HOST"
  fi

  compose --profile tls run --rm --entrypoint certbot certbot \
    certonly \
    --webroot \
    --webroot-path /var/www/certbot \
    --email "$LETSENCRYPT_EMAIL" \
    --agree-tos \
    --no-eff-email \
    --keep-until-expiring \
    "${identifier_args[@]}" \
    "${staging_args[@]}"
}

deploy() {
  load_environment
  require_tools
  prepare_directories

  if certificate_exists; then
    render_nginx https
  else
    render_nginx http
  fi

  log "Building and starting the application"
  compose up --build -d

  if ! certificate_exists; then
    log "Waiting for the HTTP endpoint used by Let's Encrypt"
    local ready=0
    for _ in {1..30}; do
      if curl --fail --silent --show-error --max-time 5 --noproxy '*' \
        --connect-to "$PUBLIC_HOST:80:127.0.0.1:80" "http://$PUBLIC_HOST/api" >/dev/null; then
        ready=1
        break
      fi
      sleep 2
    done
    [[ "$ready" == "1" ]] || fail "http://$PUBLIC_HOST is unreachable. Check the EC2 public address and port 80, then run deploy again."

    issue_certificate
    render_nginx https
    compose up -d --force-recreate nginx
  fi

  compose --profile tls up -d certbot

  log "Checking the HTTPS endpoint"
  local healthy=0
  for _ in {1..20}; do
    if curl --fail --silent --show-error --max-time 5 --noproxy '*' \
      --connect-to "$PUBLIC_HOST:443:127.0.0.1:443" "https://$PUBLIC_HOST/api" >/dev/null; then
      healthy=1
      break
    fi
    sleep 2
  done

  if [[ "$healthy" != "1" && "$LETSENCRYPT_STAGING" == "1" ]]; then
    log "Staging TLS is active; browser/curl trust checks are expected to fail."
  elif [[ "$healthy" != "1" ]]; then
    fail "Deployment started, but https://$PUBLIC_HOST/api did not pass its health check. Run ./deploy.sh logs."
  fi

  compose ps
  log "Deployment complete: https://$PUBLIC_HOST"
}

renew() {
  load_environment
  require_tools
  prepare_directories
  certificate_exists || fail "No certificate exists for $PUBLIC_HOST; run ./deploy.sh deploy first."
  compose --profile tls run --rm --entrypoint certbot certbot renew --dry-run
  compose exec nginx nginx -s reload
  log "Renewal dry run succeeded and Nginx was reloaded."
}

command="${1:-}"
case "$command" in
  deploy)
    deploy
    ;;
  update)
    command -v git >/dev/null 2>&1 || fail "Git is not installed."
    git -C "$SCRIPT_DIR" pull --ff-only
    deploy
    ;;
  renew)
    renew
    ;;
  status)
    load_environment
    require_tools
    compose ps
    ;;
  logs)
    load_environment
    require_tools
    compose logs --follow --tail=200
    ;;
  restart)
    load_environment
    require_tools
    compose restart app nginx
    ;;
  stop)
    load_environment
    require_tools
    compose --profile tls down
    ;;
  -h|--help|help)
    usage
    ;;
  *)
    usage >&2
    exit 2
    ;;
esac
