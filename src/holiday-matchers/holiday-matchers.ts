import { DateTime } from 'luxon-business-days';

export function isNewYear(dt: DateTime): boolean {
  const newYear = DateTime.fromObject({ month: 1, day: 1 });
  return +dt === +newYear;
}

export function isChristmasDay(dt: DateTime): boolean {
  const stDay = DateTime.fromObject({ month: 12, day: 25 });
  const ndDay = DateTime.fromObject({ month: 12, day: 26 });
  return +dt === +stDay || +dt === +ndDay;
}

export function isWetMonday(dt: DateTime): boolean {
  const [month, day
  ] = dt.availableHolidayHelpers.getEasterMonthAndDay(dt.year);
  const wetMonday = DateTime.fromObject({ month, day: day + 1 });
  return +dt === +wetMonday;
}

export const holidayMatchers = [isNewYear, isChristmasDay, isWetMonday];
