interface DateRange {
  start: Date;
  end: Date;
}

export function generateCalendar(
  frequency: 'day' | 'week' | 'month',
  coef: number = 1,
  startDate: Date = new Date('2024-01-01'),
  endDate: Date = new Date('2024-12-31'),
): DateRange[] {
  const calendar: DateRange[] = [];
  let currentStartDate = new Date(startDate);

  while (currentStartDate <= endDate) {
    let currentEndDate = new Date(currentStartDate);

    switch (frequency) {
      case 'day':
        currentEndDate.setDate(currentEndDate.getDate());
        break;
      case 'week':
        currentEndDate.setDate(
          currentEndDate.getDate() + coef * 6 + (coef - 1),
        );
        break;
      case 'month':
        currentEndDate.setMonth(currentEndDate.getMonth() + coef * 1);
        currentEndDate.setDate(0);
        break;
      default:
        throw new Error('Invalid frequency');
    }

    if (currentEndDate > endDate) {
      currentEndDate = new Date(endDate);
    }

    calendar.push({
      start: new Date(currentStartDate),
      end: new Date(currentEndDate),
    });

    currentStartDate = new Date(currentEndDate);
    currentStartDate.setDate(currentStartDate.getDate() + 1);
  }

  return calendar;
}
