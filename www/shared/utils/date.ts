// Pure, framework-agnostic date formatting (§5.4a: pure utils live in shared/,
// auto-imported by both app/ and server/). Uses UTC field accessors so SSR and
// client produce identical strings (no timezone-driven hydration mismatch).
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export function formatDate(input: string | Date | undefined | null): string {
  if (!input) return ''
  const d = input instanceof Date ? input : new Date(input)
  if (Number.isNaN(d.getTime())) return ''
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}
