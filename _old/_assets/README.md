# `_old/_assets/` — every image from the old branches, in one place

All image files (`png/jpg/gif/webp/avif/ico/svg`) that ever existed across the
pre-`dev-2026` branches, gathered here so you can see them at a glance.

**Deduped by content.** 39 image entries across 8 refs collapse to **5 unique
images** (the same files were copied across branches). Each is stored once below;
the table maps it back to every branch + path it lived at. Dedup is by git blob
SHA (content hash), so identical bytes → one file here.

| File | Size | Subject | Original path(s) | In branches |
|---|---|---|---|---|
| `gagan_daroach_donuts.gif` | 5.3 MB | Gagan at Metro Market, Milwaukee 2018 (the "milk & donuts" welcome gif) | `www/public/media/gagan_daroach_donuts.gif` | dev, cursor, post-cassie, main, nuxt3, **dev-2026 (live)** |
| `gagan_outside_tree_home.jpg` | 1.5 MB | Gagan outside, tree/home | `www/public/media/gagan_daroach_outside_tree_home.jpg`, `_old/public/outside_tree_home.jpg`, `public/outside_tree_home.jpg` | all 7 old branches + **dev-2026 (live)** |
| `favicon.svg` | 140 KB | site favicon (vector) | `www/public/favicon.svg` | dev, cursor, post-cassie, main, nuxt3, **dev-2026 (live)** |
| `favicon.ico` | 15 KB | legacy Next.js favicon | `_old/public/favicon.ico`, `public/favicon.ico` | dev, cursor, post-cassie, main, nuxt3, main-bk1, main-bkup |
| `Emoji_100.svg` | 3.6 KB | "💯" emoji asset (Next era) | `_old/public/Emoji_100.svg`, `public/Emoji_100.svg` | dev, cursor, post-cassie, main, nuxt3, main-bk1, main-bkup |

## Notes
- **Already live in the new site:** `gagan_daroach_donuts.gif` and
  `gagan_outside_tree_home.jpg` are already in `../../www/public/media/`, and
  `favicon.svg` in `../../www/public/`. The two `favicon.ico` / `Emoji_100.svg`
  are Next.js-era leftovers not used by the Nuxt 4 site.
- **No timeline photos here** — the 6 `www/public/timeline/*.jpg` (§5.3) never
  existed in any branch; those are new and you supply them.
- This folder is the human-viewable companion to `../ASSETS-INVENTORY.md`.
