# `_old/` — archived branch collation

This directory collates the **pre-`dev-2026` branches** into one place so the
old remote branches can eventually be pruned without losing their code or the
reasoning behind them. Done 2026-06-08 during the `dev-2026` rebuild (see
`../DESIGN_PROPOSAL.md` §1 for the original branch archaeology).

## What's here

Each subdirectory is an **asset-stripped snapshot** of one branch's source —
code, configs, content, and `THEME.md` (what the branch was, what's worth
salvaging). Binary assets (images, gifs, fonts, favicons), lockfiles, editor
dirs (`.vscode`/`.vs`), and build output were removed; the nested `_old/`
(Next.js lineage) inside the Nuxt branches was de-duplicated to `main-bk1/`.

| Dir | Source branch | Stack | One-liner |
|---|---|---|---|
| [`main/`](main/THEME.md) | `origin/main` | Nuxt 3.13 + Tailwind 3 | **The production deployment** — `chart/` + `docker/` (carried forward live to the repo root). |
| [`dev/`](dev/THEME.md) | `origin/dev` | Nuxt 3.13 + Tailwind 3 | The dnet **design tokens** + **cookie-consent** UX (the design language `dev-2026` ports). |
| [`cursor/`](cursor/THEME.md) | `origin/gdaroach/cursor` | Nuxt 3.13 | Frontend-learning **atomic-design sandbox** — explicitly NOT the model (§5.4a); the `HardwareStatus` card idea is the one keeper. |
| [`nuxt3/`](nuxt3/THEME.md) | `origin/nuxt3` | Nuxt 3.10 + Content v2 | Older Nuxt 3, split CSS files, `Breadcrumbs.vue`. Superseded. |
| [`main-bk1/`](main-bk1/THEME.md) | `origin/main-bk1` | Next.js 12 + React + Mongo | **The only analytics that ever shipped** — the data-model reference (ported to SQLite in Phase 4). `origin/main-bkup` is a **byte-identical mirror** (not duplicated here). |
| [`post-cassie/`](post-cassie/) | `origin/gdaroach/post-cassie-session-1` | Nuxt 3.13 | A small bug-fix pass over `dev` — captured as a **patch** (`dev-to-post-cassie.patch`), not a full tree. |

Not collated: `gdaroach/update-dev-to-nuxt4` (referenced in the proposal but not
present as a remote branch in this clone).

## Assets (stripped — re-port later)

All binary assets were removed from this archive; see
[`ASSETS-INVENTORY.md`](ASSETS-INVENTORY.md) for the full list and where each
one lives. The two the new site already uses (`gagan_daroach_donuts.gif`,
`gagan_daroach_outside_tree_home.jpg`) are already in `../www/public/media/`.

## Re-porting an asset later

The originals still live in the un-pruned remote branches and in git history.
To pull one back:

```bash
git show origin/dev:www/public/favicon.svg > www/public/favicon.svg
# or, by tree path from this archive's inventory:
git checkout origin/dev -- www/public/media/<file>
```
