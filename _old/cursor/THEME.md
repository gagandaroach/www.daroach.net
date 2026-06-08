# `cursor` — the atomic-design learning sandbox

**Source:** `origin/gdaroach/cursor` · **Stack:** Nuxt 3.13.

## Main theme
A **frontend-learning sandbox** that took Atomic Design all the way:
`components/{atoms,molecules,organisms,templates}/` plus a `useAtomicDesign()`
composable and feature-sliced Pinia (`stores/features/{cookies,debug,ui,welcome}/`).

> **Explicitly NOT the model for `dev-2026`.** The proposal (§5.4a) rejects this
> atomic-design ceremony as over-engineering for an app of this size — the
> "is this a molecule or an organism?" classification buys nothing the runtime
> cares about. `dev-2026` organizes by **feature/domain + a small `ui/`
> primitives folder** instead.

## The one keeper
- **`components/molecules/HardwareStatus.vue`** — a live-updating "hardware
  status" card concept worth reimplementing (not copying) for the homelab card
  idea on the dashboard (§5.6). *Optional/deferred in `dev-2026` Phase 5 — it
  needs a real homelab metrics feed, so it was left out rather than faked.*

## Otherwise
Everything else (atoms/molecules/organisms/templates, `useAtomicDesign`, the
feature-store layout, the welcome gate) is **reference-only / rejected**. Build
fresh from §5.4a, not from this tree.
