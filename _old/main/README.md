# [www.daroach.net](https://www.daroach.net) source code

Dear reader, welcome to my piece of our digital & physical world. Feel free to contribute, distribute, or modify as you wish **<3**.

## Technology Stack

**Frontend**

* Vue 3
* Nuxt 3
* TailwindCSS

**Backend**

* k3s (single-node homelab cluster)
* Helm (chart under [`chart/`](./chart))
* Traefik (in-cluster Ingress)
* Cloudflare Tunnel (public ingress — no inbound ports, TLS terminated by Cloudflare)
* nerdctl + containerd (image build path — no container registry)

## Repository Layout

```
www/        Nuxt 3 application source
docker/     Dockerfile.prod — multi-stage build (Alpine toolchain for better-sqlite3)
chart/      Helm chart (Deployment + Service + Ingress) and install.sh
```

## Developer Guide

### System Setup

```sh
# Install Node Version Manager (any install method works — pacman, brew, curl, etc.)
# Example on Arch: yay -S nvm

# Install Node 22 (Nuxt 3.21+ requires Node >= 20.19)
nvm install 22
nvm use 22
```

### Running the Dev Server

```sh
cd www
npm install
npm run dev
```

## Deploying

The site runs on a k3s homelab cluster fronted by a Cloudflare Tunnel. The deploy model is: **Cloudflare Tunnel → Traefik → Ingress (host-based) → Service → Nuxt pod**.

### Prerequisites

- A k3s cluster with `kubectl` + `helm` + `nerdctl` available on the build host
- A `cloudflared` Deployment already running in-cluster with a `TUNNEL_TOKEN` (see `~/k3s-setup/cloudflared/` for the reference manifest used on this homelab)
- A public hostname routing in Cloudflare Zero Trust that points `www.daroach.net` (and optionally `daroach.net`) at the in-cluster Traefik service

### One-command deploy

```sh
./chart/install.sh
```

This script:

1. Builds `wwwdnet-prod:latest` directly into k3s's containerd (`k8s.io` namespace) via `sudo nerdctl --namespace k8s.io build` — no registry push needed.
2. Creates the `www-daroach` namespace if missing.
3. Runs `helm upgrade --install` against [`chart/`](./chart).
4. Waits for the rollout and prints the in-cluster and public URLs.

### Key chart values

See [`chart/values.yaml`](./chart/values.yaml). Highlights:

| Value | Default |
|---|---|
| `image.repository` / `tag` | `wwwdnet-prod` / `latest` |
| `service.port` → `targetPort` | `80` → `3000` |
| `ingress.className` / `entrypoint` | `traefik` / `web` |
| `ingress.hosts` | `daroach.net`, `www.daroach.net` |
| `nodeSelector` | `kubernetes.io/hostname: blackhole.daroach.lan` |

### Cloudflare Tunnel (one-time)

In the Cloudflare Zero Trust dashboard, on the existing homelab tunnel, add public hostnames for `www.daroach.net` (and `daroach.net`) pointing at the in-cluster Traefik service (e.g. `http://traefik.kube-system.svc.cluster.local:80`). Traefik then fans out to the right Service by Host header via the chart's Ingress. No cert-manager is needed — Cloudflare handles TLS.

## Gotchas

- **Node version**: Nuxt 3.21 and its dependency tree require Node ≥ 20.19. The Dockerfile uses `node:22-alpine`.
- **`@nuxt/content` + `better-sqlite3`**: `@nuxt/content` needs `better-sqlite3`, which requires a native compile. The build stage installs Alpine `python3 make g++` and runs `npm install better-sqlite3` explicitly so it compiles non-interactively (otherwise `nuxt build` tries to prompt and silently aborts in CI/non-TTY contexts).
- **No registry**: images are loaded straight into k3s's containerd via `nerdctl --namespace k8s.io build`. If you build on a host that isn't the k3s node, you'll need to save/import the image or stand up a registry.
- **No `package-lock.json`**: it's intentionally gitignored (see commit `6963619`); the Dockerfile only copies `package.json`.
