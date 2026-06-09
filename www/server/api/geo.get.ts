// GET /api/geo — per-country hit counts for the dashboard world map (§5.6).
// Keyed by the ISO-2 stored from CF-IPCountry. Like /api/stats, a read failure
// is intentionally left to surface as a 500 (the dashboard store handles it).
export default defineEventHandler(() => {
  const db = getDb()
  const rows = db
    .prepare(
      `SELECT country, COUNT(*) AS count
       FROM hits
       WHERE country IS NOT NULL
       GROUP BY country
       ORDER BY count DESC`,
    )
    .all() as { country: string; count: number }[]

  return rows
})
