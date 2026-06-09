// GET /api/stats — aggregate visitor stats for the dashboard (§5.6).
//
// Deliberately NOT wrapped in try/catch (unlike the write path in hit.post.ts):
// a read failure SHOULD surface as a 500 so the dashboard store can show a real
// "couldn't load" state, rather than silently rendering an empty dashboard.
//
// NB on "unique visitors": visitor_hash is rotated daily (§5.2), so a distinct
// count within a single day is a true unique-visitor count, but summed across
// days it's really "unique visitor-days". The dashboard labels the 24h figure
// accordingly.
export default defineEventHandler(() => {
  const db = getDb()
  const now = Date.now()
  const dayAgo = now - 86_400_000
  const monthAgo = now - 30 * 86_400_000

  const totalHits = (db.prepare('SELECT COUNT(*) AS n FROM hits').get() as { n: number }).n
  const last24hHits = (
    db.prepare('SELECT COUNT(*) AS n FROM hits WHERE ts >= ?').get(dayAgo) as { n: number }
  ).n
  const uniqueVisitors24h = (
    db
      .prepare('SELECT COUNT(DISTINCT visitor_hash) AS n FROM hits WHERE ts >= ? AND visitor_hash IS NOT NULL')
      .get(dayAgo) as { n: number }
  ).n
  const countries = (
    db.prepare('SELECT COUNT(DISTINCT country) AS n FROM hits WHERE country IS NOT NULL').get() as { n: number }
  ).n

  const topPaths = db
    .prepare('SELECT path, COUNT(*) AS count FROM hits GROUP BY path ORDER BY count DESC LIMIT 10')
    .all() as { path: string; count: number }[]

  // Daily series (last 30 days), bucketed by UTC day in SQL.
  const daily = db
    .prepare(
      `SELECT strftime('%Y-%m-%d', ts / 1000, 'unixepoch') AS date,
              COUNT(*)                    AS hits,
              COUNT(DISTINCT visitor_hash) AS visitors
       FROM hits
       WHERE ts >= ?
       GROUP BY date
       ORDER BY date`,
    )
    .all(monthAgo) as { date: string; hits: number; visitors: number }[]

  return { totalHits, last24hHits, uniqueVisitors24h, countries, topPaths, daily }
})
