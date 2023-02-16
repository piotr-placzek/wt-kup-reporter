"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentTimestamp = exports.getCurrentDateString = void 0;
const luxon_1 = require("luxon");
const config_1 = require("../config");
function getCurrentDateString() {
    return luxon_1.DateTime.local().setZone(config_1.TIMEZONE).toFormat('yyyy-LL-dd');
}
exports.getCurrentDateString = getCurrentDateString;
function getCurrentTimestamp() {
    return luxon_1.DateTime.local().setZone(config_1.TIMEZONE).valueOf();
}
exports.getCurrentTimestamp = getCurrentTimestamp;
//# sourceMappingURL=utils.js.map