'use strict';
const { DateTime } = require('luxon');

const TIMEZONE = require('../config').TIMEZONE;

function startOfMonth(year, month) {
  return DateTime.utc(year, month).setZone(TIMEZONE).startOf('month').toISO();
}

function endOfMonth(year, month) {
  return DateTime.utc(year, month).setZone(TIMEZONE).endOf('month').toISO();
}

module.exports = {
  startOfMonth,
  endOfMonth,
};
