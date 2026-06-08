// Shared analytics response shapes (§5.4a: cross-cutting types in shared/,
// usable by both server handlers and the client store/components).
export interface PathCount {
  path: string
  count: number
}

export interface DailyPoint {
  date: string // YYYY-MM-DD (UTC)
  hits: number
  visitors: number
}

export interface Stats {
  totalHits: number
  last24hHits: number
  uniqueVisitors24h: number
  countries: number
  topPaths: PathCount[]
  daily: DailyPoint[]
}

export interface CountryCount {
  country: string // ISO-2
  count: number
}
