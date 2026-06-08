# `main` — the production deployment

**Source:** `origin/main` · **Stack:** Nuxt 3.13, Tailwind 3.4, `@nuxt/content` v2.

## Main theme
This is the branch that was **actually live** — daroach.net on k3s behind a
Cloudflare Tunnel. Its value isn't the app (a Nuxt 3 predecessor of `dev-2026`)
but the **production deployment story**:

- `chart/` — Helm chart: `Chart.yaml`, `values.yaml` (image `wwwdnet-prod:latest`,
  service 80→3000, Traefik ingress, hosts `daroach.net` + `www.daroach.net`,
  nodeSelector `blackhole.daroach.lan`), and `install.sh` (builds into k3s
  containerd via `nerdctl --namespace k8s.io build` — no registry — then
  `helm upgrade --install` and waits for rollout).
- `docker/Dockerfile.prod` — multi-stage `node:22-alpine`; installs
  `python3 make g++` to compile `better-sqlite3`.
- `docker/launch.sh`.

## Carried forward
The `chart/` and `docker/` dirs are **live at the repo root** on `dev-2026`
(reused as-is per the proposal). The Phase 6 "prod launch regime" updates them
for the Nuxt 4 `app/` layout + Tailwind v4 + the analytics PVC — see
`../../DESIGN_PROPOSAL.md` §6/§7.

## Superseded
The `www/` Nuxt 3 app here is replaced by the `dev-2026` rebuild.
