// Every date and time in Encore is America/New_York, never the device zone (SPEC "Logic").
export const TZ = "America/New_York";

const dayFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short", month: "short", day: "numeric" });
const timeFmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, hour: "numeric", minute: "2-digit" });
const keyFmt = new Intl.DateTimeFormat("en-CA", { timeZone: TZ, year: "numeric", month: "2-digit", day: "2-digit" });

/** "Fri, Nov 6" */
export function formatDay(d: Date | string): string {
  return dayFmt.format(new Date(d));
}

/** "7:30 PM" */
export function formatTime(d: Date | string): string {
  return timeFmt.format(new Date(d));
}

/** NY calendar date as "YYYY-MM-DD", for grouping and day maths. */
export function dateKey(d: Date | string): string {
  return keyFmt.format(new Date(d));
}

/** Whole NY calendar days from `from` to `to` (negative if `to` is earlier). DST-proof. */
export function daysBetween(from: Date | string, to: Date | string): number {
  const utc = (k: string) => Date.UTC(+k.slice(0, 4), +k.slice(5, 7) - 1, +k.slice(8, 10));
  return Math.round((utc(dateKey(to)) - utc(dateKey(from))) / 86_400_000);
}

/** "Today" / "Tomorrow" / "In N days" relative to now in New York. */
export function relativeDay(d: Date | string, now: Date = new Date()): string {
  const n = daysBetween(now, d);
  if (n <= 0) return "Today";
  if (n === 1) return "Tomorrow";
  return `In ${n} days`;
}
