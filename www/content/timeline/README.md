# Timeline content

Each `*.yml` file is one timeline entry, consumed by the `timeline` collection
defined in `content.config.ts` (see `DESIGN_PROPOSAL.md` §5.3). These are
**stubs** — the `blurb` fields are placeholders for Gagan to fill in.

## Schema

```yaml
year: 2026                       # number — display year
order: 60                        # number — sort key; HIGHER = more recent (newest first)
title: Founder — Dekho LLC       # string — headline for the entry
photo: /timeline/2026-dekho.jpg  # string — path under www/public/timeline/
tags: [founder, startup]         # string[] — optional
blurb: >                         # string — the text blurb (currently STUB)
  ...
```

The `order` field exists because **2013 has two entries** (Peshtigo HS graduation
in spring, UW–Madison starting fall) — `year` alone can't sort them. Display the
timeline sorted by `order` descending (newest at top).

## Current entries (newest → oldest)

| order | year | title |
|---|---|---|
| 60 | 2026 | Founder — Dekho LLC |
| 50 | 2020 | Machine Learning Engineer — NVIDIA |
| 40 | 2017 | Milwaukee School of Engineering |
| 31 | 2013 | University of Wisconsin–Madison |
| 30 | 2013 | Graduated — Peshtigo High School |
| 10 | 1995 | Born — Wisconsin |

## TODO before launch

1. **Replace every `blurb`** — they're all marked `STUB`.
2. **Add the photos** to `www/public/timeline/` (one per entry, paths above):
   `2026-dekho.jpg`, `2020-nvidia.jpg`, `2017-msoe.jpg`, `2013-uw-madison.jpg`,
   `2013-peshtigo-hs.jpg`, `1995-born.jpg`. Until then, the `<TimelineEntry>`
   component should render a placeholder when the image is missing.
