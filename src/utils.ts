import { DateTime } from 'luxon';
import { TIMEZONE } from './config';

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
