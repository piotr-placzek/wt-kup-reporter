import { DateTime } from 'luxon';
import { TIMEZONE } from '../config';

export function getCurrentDateString() {
  return DateTime.local().setZone(TIMEZONE).toFormat('yyyy-LL-dd');
}

export function getCurrentTimestamp() {
  return DateTime.local().setZone(TIMEZONE).valueOf();
}
