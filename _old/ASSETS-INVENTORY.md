# Stripped-asset inventory

Binary assets removed from the `_old/` collation on 2026-06-08, so the archive
stays code-only. The originals remain in the un-pruned remote branches and git
history — re-port with `git show <ref>:<path>` or `git checkout <ref> -- <path>`.

These six files are **identical across every Nuxt branch** (`main`, `dev`,
`cursor`, `post-cassie`, `nuxt3`); `main-bk1`/`main-bkup` carry only the three
root-`public/` ones. Sizes are approximate.

| Asset | Size | Path in the Nuxt branches | Notes |
|---|---|---|---|
| donuts gif | 5.3 MB | `www/public/media/gagan_daroach_donuts.gif` | "Gagan at Metro Market, 2018." **Already in `../www/public/media/`.** |
| tree photo | 1.5 MB | `www/public/media/gagan_daroach_outside_tree_home.jpg` | **Already in `../www/public/media/`.** |
| favicon (svg) | 140 KB | `www/public/favicon.svg` | New site has its own `../www/public/favicon.svg`. |
| tree photo (Next) | 1.5 MB | `_old/public/outside_tree_home.jpg` (Next lineage) | Same subject as the www jpg. |
| favicon (ico) | 15 KB | `_old/public/favicon.ico` (Next lineage) | Legacy Next favicon. |
| Emoji_100 | 3.6 KB | `_old/public/Emoji_100.svg` (Next lineage) | "💯" emoji asset. |

## Candidate re-ports for the new site

- **Timeline photos** (`www/public/timeline/*.jpg`, §5.3) — *not* in any old
  branch; Gagan supplies these fresh.
- The **donuts gif** + **tree photo** are already present in `../www/public/media/`.
- `PeshtigoTree` imagery referenced by `dev:www/composables/images/PeshtigoTree.ts`
  (see `dev/THEME.md`) may suit the Peshtigo HS timeline entry.
