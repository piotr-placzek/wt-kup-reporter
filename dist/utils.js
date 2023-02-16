"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTimestamp = exports.getCurrentDateString = exports.endOfMonth = exports.startOfMonth = void 0;
const luxon_1 = require("luxon");
const config_1 = require("./config");
function startOfMonth(year, month) {
    return luxon_1.DateTime.utc(year, month).setZone(config_1.TIMEZONE).startOf('month').toJSDate();
}
exports.startOfMonth = startOfMonth;
function endOfMonth(year, month) {
    return luxon_1.DateTime.utc(year, month).setZone(config_1.TIMEZONE).endOf('month').toJSDate();
}
exports.endOfMonth = endOfMonth;
function getCurrentDateString() {
    return luxon_1.DateTime.local().setZone(config_1.TIMEZONE).toFormat('yyyy-LL-dd');
}
exports.getCurrentDateString = getCurrentDateString;
function getCurrentTimestamp() {
    return luxon_1.DateTime.local().setZone(config_1.TIMEZONE).valueOf();
}
exports.getCurrentTimestamp = getCurrentTimestamp;
//# sourceMappingURL=utils.js.map