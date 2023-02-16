import { DateTime } from 'luxon';
import { TIMEZONE } from '../config';

export function startOfMonth(year, month) {
  return DateTime.utc(year, month).setZone(TIMEZONE).startOf('month').toISO();
}

export function endOfMonth(year, month) {
  return DateTime.utc(year, month).setZone(TIMEZONE).endOf('month').toISO();
}
