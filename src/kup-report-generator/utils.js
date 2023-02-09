'use strict';
const { DateTime } = require('luxon');

const TIMEZONE = require('../config').TIMEZONE;

function getCurrentDateString() {
  return DateTime.local().setZone(TIMEZONE).toFormat('yyyy-LL-dd');
}

function getCurrentTimestamp() {
  return DateTime.local().setZone(TIMEZONE).valueOf();
}

module.exports = {
  getCurrentDateString,
  getCurrentTimestamp,
};
