// Analytics datastore — better-sqlite3 singleton + a tiny migration runner
// (§5.2). Server-only (hard boundary, §5.4a): secrets/DB never reach the client.
//
// The DB path comes from runtimeConfig.analyticsDbPath (NUXT_ANALYTICS_DB_PATH);
// in prod it points at the PVC mount (Phase 6) so `hits` survives pod restarts.
import Database from 'better-sqlite3'
import { mkdirSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

let db: Database.Database | null = null

// Ordered, append-only. The array index+1 IS the schema version (PRAGMA
// user_version); add new statements to the END, never edit a shipped one.
const MIGRATIONS: string[] = [
  // v1 — the hits table (privacy-first: country + salted hash, NEVER raw IP).
  `CREATE TABLE IF NOT EXISTS hits (
     id           INTEGER PRIMARY KEY,
     ts           INTEGER NOT NULL,   -- epoch ms
     path         TEXT    NOT NULL,
     referrer     TEXT,
     country      TEXT,               -- ISO-2 from CF-IPCountry
     region       TEXT,
     ua           TEXT,
     visitor_hash TEXT                -- salted HMAC of IP, NOT the IP
   );
   CREATE INDEX IF NOT EXISTS idx_hits_ts ON hits(ts);
   CREATE INDEX IF NOT EXISTS idx_hits_country ON hits(country);
   CREATE INDEX IF NOT EXISTS idx_hits_visitor ON hits(visitor_hash);`,
]

function migrate(database: Database.Database): void {
  const current = database.pragma('user_version', { simple: true }) as number
  for (let v = current; v < MIGRATIONS.length; v++) {
    const tx = database.transaction(() => {
      database.exec(MIGRATIONS[v]!)
      database.pragma(`user_version = ${v + 1}`)
    })
    tx()
  }
}

export function getDb(): Database.Database {
  if (db) return db
  const { analyticsDbPath } = useRuntimeConfig()
  const path = resolve(analyticsDbPath || './.data/analytics.sqlite3')
  mkdirSync(dirname(path), { recursive: true }) // better-sqlite3 needs the dir to exist
  db = new Database(path)
  db.pragma('journal_mode = WAL') // concurrent reads (dashboard) while writing hits
  migrate(db)
  return db
}

export interface HitRecord {
  ts: number
  path: string
  referrer?: string | null
  country?: string | null
  // `region` is reserved for an optional GeoLite2 city/region lookup (§5.2);
  // it's currently always null (CF only gives us country) — intentional headroom.
  region?: string | null
  ua?: string | null
  visitorHash?: string | null
}

// Prepared once, lazily (the DB must exist first), then reused for every insert.
let _insertStmt: ReturnType<Database.Database['prepare']> | null = null
function insertStmt() {
  return (_insertStmt ??= getDb().prepare(
    `INSERT INTO hits (ts, path, referrer, country, region, ua, visitor_hash)
     VALUES (@ts, @path, @referrer, @country, @region, @ua, @visitorHash)`,
  ))
}

export function insertHit(rec: HitRecord): void {
  insertStmt().run({
    ts: rec.ts,
    path: rec.path,
    referrer: rec.referrer ?? null,
    country: rec.country ?? null,
    region: rec.region ?? null,
    ua: rec.ua ?? null,
    visitorHash: rec.visitorHash ?? null,
  })
}

// Retention (§5.2): delete rows older than N days. Throttled to ~hourly so it
// doesn't run on every hit (module-level state is fine — Nitro server singleton).
let lastPrune = 0
export function pruneOldHits(retentionDays: number): void {
  const now = Date.now()
  if (now - lastPrune < 3_600_000) return
  lastPrune = now
  const cutoff = now - retentionDays * 86_400_000
  getDb().prepare('DELETE FROM hits WHERE ts < ?').run(cutoff)
}
