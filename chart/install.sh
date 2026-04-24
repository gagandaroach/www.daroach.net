#!/usr/bin/env bash
# Build image, import into k3s (containerd), and helm upgrade --install.
set -euo pipefail

HERE=$(cd "$(dirname "$0")" && pwd)
REPO_ROOT=$(cd "$HERE/.." && pwd)
NS=www-daroach
RELEASE=www-daroach-net
IMAGE=wwwdnet-prod:latest

echo "==> building image $IMAGE into k3s containerd (k8s.io namespace)"
sudo nerdctl --namespace k8s.io build \
  -f "$REPO_ROOT/docker/Dockerfile.prod" \
  -t "$IMAGE" \
  "$REPO_ROOT"

kubectl get ns "$NS" >/dev/null 2>&1 || kubectl create ns "$NS"

helm upgrade --install "$RELEASE" "$HERE" -n "$NS"
kubectl -n "$NS" rollout status "deploy/$RELEASE" --timeout=120s

echo
echo "=== www.daroach.net ==="
echo "In-cluster:  http://$RELEASE.$NS.svc.cluster.local"
echo "Public:      https://www.daroach.net  (once Cloudflare tunnel hostname is mapped to Traefik)"
