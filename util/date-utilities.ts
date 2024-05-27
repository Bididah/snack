export function subtractDaysFromDate(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(date.getDate() - days);
  return result;
}

export function dateToWindistrFormat(date: Date): string {
  const newDate = date.toISOString();
  const convDate =
    newDate.slice(0, 4) + newDate.slice(5, 7) + newDate.slice(8, 10);
  return convDate;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(date: Date) {
  return [date.getFullYear(), padTo2Digits(date.getMonth() + 1)].join('-');
}
