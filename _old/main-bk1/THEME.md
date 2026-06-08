# `main-bk1` — the Next.js era (the only analytics that ever shipped)

**Source:** `origin/main-bk1` · **Stack:** Next.js 12 + React + MongoDB.
**Mirror:** `origin/main-bkup` is **byte-identical** to this branch (verified via
`git diff` — empty), so it is **not** archived separately.

## Main theme
The oldest lineage — a **Next.js 12** site — and the **only iteration that ever
shipped real analytics**. That's its lasting value:

- `pages/_middleware.ts` — `postHit()` capturing path / UA / method / protocol /
  timestamp on every request.
- `pages/api/hits/{index,count}.ts` — the hit write + count endpoints.
- `models/Hit.js` — the Mongoose schema (host, port, path, params, method,
  userAgent, protocol, date).
- `components/charts/PageViews.tsx` — a chart.js pie of page views.
- Also a `/contact` page.

## How it informed `dev-2026`
Phase 4 **ported this data model** React→Nitro and Mongo→SQLite, with a
privacy upgrade: store country (CF-IPCountry) + a salted-HMAC visitor hash and
**never the raw IP** (the old model stored request metadata directly). See
`../../DESIGN_PROPOSAL.md` §5.2 and `../../www/server/`.

## Verdict
Fully superseded as an app; **kept as the analytics data-model reference**. This
is also the Next.js tree that previously sat loose at the repo-root `_old/`.
