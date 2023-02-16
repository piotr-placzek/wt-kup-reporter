"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMonthlyKupReport = void 0;
const fs_extra_1 = require("fs-extra");
const utils_1 = require("../utils");
function tableHeader(delimiter) {
    return ['DATE', 'TIME', 'TASKS'].join(delimiter) + '\n';
}
function row(daily_summaries, delimiter) {
    return ([
        daily_summaries.date,
        daily_summaries.data.reduce((a, c) => a + parseFloat(c.time), 0),
        daily_summaries.data.reduce((a, c) => (c.name !== 'Unknown' ? a.concat(c.name) : a), []).join(', '),
    ].join(delimiter) + '\n');
}
function filePath(target_directory_path) {
    return `${target_directory_path}/${(0, utils_1.getCurrentTimestamp)()}_${(0, utils_1.getCurrentDateString)()}.csv`;
}
function generateMonthlyKupReport(target_directory_path, data, delimiter = ';;') {
    try {
        const file_path = filePath(target_directory_path);
        const file = (0, fs_extra_1.openSync)(file_path, 'w');
        (0, fs_extra_1.writeFileSync)(file, tableHeader(delimiter));
        data.forEach((daily_summaries) => {
            if (daily_summaries.data?.length) {
                (0, fs_extra_1.writeFileSync)(file, row(daily_summaries, delimiter));
            }
        });
    }
    catch (error) {
        console.error(error.message);
    }
}
exports.generateMonthlyKupReport = generateMonthlyKupReport;
//# sourceMappingURL=monthly-kup-report-generator%20copy.js.map