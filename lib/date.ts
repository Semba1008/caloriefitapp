/** ローカル日付(年月日)をUTC正午基準のDateに正規化。DailyLog.dateの一意制約が
 *  タイムゾーンのずれで壊れないようにするため、常にこの関数を通す。 */
export function toDateOnly(d: Date): Date {
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), 12));
}

export function todayDateOnly(): Date {
  return toDateOnly(new Date());
}

export function parseDateParam(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12));
}

export function formatDateParam(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const WEEKDAY_LABEL_JA = ["日", "月", "火", "水", "木", "金", "土"];

export function weekdayLabel(d: Date): string {
  return WEEKDAY_LABEL_JA[d.getUTCDay()];
}

/** 月曜始まりの週の開始日(月曜)を返す */
export function startOfWeekMonday(d: Date): Date {
  const day = d.getUTCDay(); // 0=日曜
  const diff = day === 0 ? -6 : 1 - day;
  const result = new Date(d);
  result.setUTCDate(d.getUTCDate() + diff);
  return toDateOnly(result);
}

export function addDays(d: Date, days: number): Date {
  const result = new Date(d);
  result.setUTCDate(d.getUTCDate() + days);
  return toDateOnly(result);
}

export function startOfMonthDate(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1, 12));
}

export function endOfMonthDate(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0, 12));
}

export function addMonths(d: Date, months: number): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + months, 1, 12));
}

export function formatMonthParam(d: Date): string {
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

export function parseMonthParam(monthStr: string): Date {
  const [y, m] = monthStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1, 12));
}
