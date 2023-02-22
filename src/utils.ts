import { DateTime } from 'luxon-business-days';
import { Interval } from 'luxon';
import { TIMEZONE, BUSINESS_DAYS, HOURS_PER_DAY } from './config';

export function startOfMonth(year: number, month: number): Date {
  return DateTime.utc(year, month).setZone(TIMEZONE).startOf('month').toJSDate();
}

export function endOfMonth(year: number, month: number): Date {
  return DateTime.utc(year, month).setZone(TIMEZONE).endOf('month').toJSDate();
}

export function getCurrentDateString(): string {
  return DateTime.local().setZone(TIMEZONE).toFormat('yyyy-LL-dd');
}

export function getCurrentTimestamp(): string {
  return DateTime.local().setZone(TIMEZONE).valueOf();
}

export function businessHoursPerMonth(year: number, month: number): number {
  const dt = DateTime.utc(year, month).setZone(TIMEZONE);
  dt.setupBusiness({ businessDays: BUSINESS_DAYS });

  const interval = Interval.fromDateTimes(dt.startOf('month'), dt.endOf('month'));

  let cnt = 0;
  let i = interval.start;
  while (i < interval.end) {
    if (i.isBusinessDay()) {
      cnt++;
    }

    i = i.plus({ days: 1 });
  }

  return cnt * HOURS_PER_DAY;
}
