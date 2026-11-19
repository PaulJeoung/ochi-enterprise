const kstFormatter = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** 한국시간 기준 오늘 날짜 (YYYY-MM-DD) */
export function todayKST(now: Date = new Date()): string {
  return kstFormatter.format(now);
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** YYYY-MM-DD 형식이면서 실제 존재하는 날짜인지 */
export function isValidDate(value: unknown): value is string {
  if (typeof value !== 'string' || !DATE_RE.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}

/** 2026-11-20 → 2026.11.20 */
export function formatDate(value: string): string {
  return value.replace(/-/g, '.');
}
