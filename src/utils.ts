import { Interval } from 'luxon';
import { DateTime } from 'luxon-business-days';
import { BUSINESS_DAYS, TIMEZONE } from './config';
import { BusinessPeriod } from './data.interface';
import { holidayMatchers } from './holiday-matchers';
import { WakaTimeDailySummary } from './wakatime';

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

export function businessDaysPerMonth(year: number, month: number, actualPeriod = false): number {
  const dt = actualPeriod ? DateTime.utc().setZone(TIMEZONE) : DateTime.utc(year, month).setZone(TIMEZONE);

  dt.setupBusiness({
    businessDays: BUSINESS_DAYS,
    holidayMatchers,
  });

  const interval = Interval.fromDateTimes(dt.startOf('month'), dt.endOf(actualPeriod ? 'day' : 'month'));

  let cnt = 0;
  let i = interval.start;
  while (i <= interval.end) {
    if (i.isBusinessDay() && !i.isHoliday()) {
      cnt++;
    }

    i = i.plus({ days: 1 });
  }

  return cnt;
}

export function spentToTotalTimeRatio(totalTimeSpent: number, business: BusinessPeriod) {
  return totalTimeSpent / ((business.businessDays - business.furloughDays) * business.hoursPerDay);
}

export function concatWakatimeMultiProjectSummariesByDate(wtSummaries: WakaTimeDailySummary[]) {
  const map = new Map<string, WakaTimeDailySummary>();

  wtSummaries.forEach((wtSummary: WakaTimeDailySummary) => {
    const { date } = wtSummary.range;
    if (!map.has(date)) {
      map.set(date, wtSummary);
      return;
    }
    const summary = map.get(date)
    summary.branches = summary.branches.concat(wtSummary.branches);
    // TODO: grand_total can be calculated...
  });

  return [...map.values()];
}
