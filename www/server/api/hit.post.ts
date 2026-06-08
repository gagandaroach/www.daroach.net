// POST /api/hit — record a page visit (§5.2). Called by the client beacon
// (useAnalytics). Privacy model: derive country + a salted-HMAC visitor hash,
// then DISCARD the raw IP — it's never stored. Analytics must never break the
// page, so everything is wrapped and always returns 204.
export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()

    const body = await readBody<{ path?: string; referrer?: string }>(event).catch(() => null)
    const path = typeof body?.path === 'string' ? body.path.slice(0, 512) : null
    if (!path) {
      // Nothing to record (malformed/empty beacon) — succeed quietly.
      setResponseStatus(event, 204)
      return null
    }

    const referrer = typeof body?.referrer === 'string' ? body.referrer.slice(0, 512) : null
    const ua = (getHeader(event, 'user-agent') || '').slice(0, 256) || null
    const country = resolveCountry(event)

    const ts = Date.now()
    const ip = resolveClientIp(event)
    const salt = config.ipHashSalt || 'dev-insecure-salt'
    const visitorHash = ip ? hashVisitor(ip, salt, utcDayKey(ts)) : null
    // ── raw IP intentionally goes no further than this scope ──

    insertHit({ ts, path, referrer, country, ua, visitorHash })
    pruneOldHits(Number(config.analyticsRetentionDays) || 90)

    setResponseStatus(event, 204)
    return null
  } catch (err) {
    console.error('[analytics] hit failed:', err)
    setResponseStatus(event, 204)
    return null
  }
})
