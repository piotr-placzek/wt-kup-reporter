"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMonthlyKupReport = void 0;
const XLSX = __importStar(require("xlsx-js-style"));
const report_formatting_1 = require("./report-formatting");
function reportHeader(employee, month) {
    return [
        [(0, report_formatting_1.reportTitleCell)('Raport czasu pracy')],
        [(0, report_formatting_1.specialDescriptionCell)('Pracownik'), (0, report_formatting_1.specialValueCell)(employee)],
        [(0, report_formatting_1.specialDescriptionCell)('Miesiąc'), (0, report_formatting_1.specialDescriptionCell)(month)],
    ];
}
function tableHeader(columns) {
    return columns.map((columnName) => (0, report_formatting_1.tableHeaderCell)(columnName));
}
function tableContent(monthlySummaries) {
    return monthlySummaries.map((dailySummary, index) => {
        return [
            (0, report_formatting_1.tableContentCellWithAlternatingColours)(dailySummary.date, index),
            (0, report_formatting_1.tableContentCellWithAlternatingColours)(dailySummary.data.reduce((a, c) => a + c.time, 0), index, 'center', '0.00'),
            (0, report_formatting_1.tableContentCellWithAlternatingColours)(dailySummary.data.reduce((a, c, i) => a + c.name + (i > 0 ? '\n' : ''), ''), index, 'left'),
        ];
    });
}
function totalHours(amountOfRows) {
    return [(0, report_formatting_1.specialDescriptionCell)('Godzin razem'), (0, report_formatting_1.specialValueCell)(`=SUM(B6:B${6 + amountOfRows - 1})`, '0.00')];
}
function totalHoursPercentage(amountOfRows, totalWorkingHours) {
    return [
        (0, report_formatting_1.specialDescriptionCell)('Procent godzin'),
        (0, report_formatting_1.specialValueCell)(`=B${6 + amountOfRows}*100/${totalWorkingHours}`, '0.00%'),
    ];
}
function targetFilePath(suffix, dir) {
    return `${dir || './'}report-${suffix ? suffix + '-' : ''}${Date.now()}.xlsx`;
}
function generateMonthlyKupReport(employeeName, range, totalWorkingHours, monthlySummaries, suffix, dir) {
    const rows = [];
    rows.push(...reportHeader(employeeName, `${range.month}/${range.year}`));
    rows.push([]);
    rows.push(tableHeader(['Data', 'Ilość godzin', 'Zadania']));
    rows.push(...tableContent(monthlySummaries));
    rows.push(totalHours(monthlySummaries.length));
    rows.push(totalHoursPercentage(monthlySummaries.length, totalWorkingHours));
    rows.push([]);
    rows.push((0, report_formatting_1.signatureSection)('Podpis pracownika', 2));
    rows.push((0, report_formatting_1.signatureSection)('Podpis pracodawcy', 2));
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, targetFilePath(suffix, dir));
}
exports.generateMonthlyKupReport = generateMonthlyKupReport;
//# sourceMappingURL=monthly-kup-report-generator.js.map