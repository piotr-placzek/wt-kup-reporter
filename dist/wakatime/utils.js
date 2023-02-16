"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endOfMonth = exports.startOfMonth = void 0;
const luxon_1 = require("luxon");
const config_1 = require("../config");
function startOfMonth(year, month) {
    return luxon_1.DateTime.utc(year, month).setZone(config_1.TIMEZONE).startOf('month').toISO();
}
exports.startOfMonth = startOfMonth;
function endOfMonth(year, month) {
    return luxon_1.DateTime.utc(year, month).setZone(config_1.TIMEZONE).endOf('month').toISO();
}
exports.endOfMonth = endOfMonth;
//# sourceMappingURL=utils.js.map