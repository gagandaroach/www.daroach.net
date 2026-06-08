// Real-client-IP resolution, country, and privacy-preserving visitor hashing
// (§5.2). Server-only — uses node:crypto + h3 request helpers.
//
// Topology: client → Cloudflare edge → cloudflared → Traefik → pod:3000.
// CF injects CF-Connecting-IP (real client IP) and CF-IPCountry. For these to
// be trustworthy, Traefik must trust the CF CIDRs (forwardedHeaders.trustedIPs)
// — see §6/§5.2; otherwise X-Forwarded-For is spoofable. That's a deploy-time
// (Phase 6) concern; this code just reads the headers in priority order.
import { createHmac } from 'node:crypto'
import type { H3Event } from 'h3'

export function resolveClientIp(event: H3Event): string | null {
  // 1. Cloudflare's single, authoritative client IP.
  const cf = getHeader(event, 'cf-connecting-ip')
  if (cf) return cf.trim()
  // 2. First hop of X-Forwarded-For (only trustworthy behind a trusted proxy).
  const xff = getHeader(event, 'x-forwarded-for')
  if (xff) return xff.split(',')[0]?.trim() || null
  // 3. Socket / h3 fallback.
  return getRequestIP(event, { xForwardedFor: true }) || null
}

export function resolveCountry(event: H3Event): string | null {
  const c = getHeader(event, 'cf-ipcountry')
  if (!c) return null
  const up = c.toUpperCase()
  // CF sentinels: XX = unknown, T1 = Tor. Only keep real ISO-2 codes.
  if (up.length !== 2 || up === 'XX' || up === 'T1') return null
  return up
}

// epoch ms → 'YYYY-MM-DD' (UTC). Rotates the hash daily.
export function utcDayKey(ts: number): string {
  return new Date(ts).toISOString().slice(0, 10)
}

// Keyed HMAC of the IP with a (salt + day) key — plain hashing of an IPv4 is
// reversible by brute force, so HMAC + a rotating secret salt is mandatory
// (§5.2). The raw IP is discarded by the caller after this. Daily rotation lets
// us count same-day unique visitors without enabling cross-day tracking.
export function hashVisitor(ip: string, salt: string, dayKey: string): string {
  return createHmac('sha256', `${salt}:${dayKey}`).update(ip).digest('hex').slice(0, 32)
}
