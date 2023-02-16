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
const report_formating_1 = require("./report-formating");
const config_1 = require("../config");
function reportHeader(employee, month) {
    return [
        [(0, report_formating_1.reportTitleCell)('Raport czasu pracy')],
        [(0, report_formating_1.employeeDescriptionCell)('Pracownik'), (0, report_formating_1.employeeValueCell)(employee)],
        [(0, report_formating_1.monthDescriptionCell)('Miesiąc'), (0, report_formating_1.monthValueCell)(month)],
    ];
}
function tableHeader(columns) {
    return columns.map((columnName) => (0, report_formating_1.tableHeaderCell)(columnName));
}
function tableContent(monthlySummaries) {
    return monthlySummaries.map((dailySummary, index) => {
        return [
            (0, report_formating_1.tableContentCellWithAlternatingColours)(dailySummary.date, index),
            (0, report_formating_1.tableContentCellWithAlternatingColours)(dailySummary.data.reduce((a, c) => a + c.time, 0), index),
            (0, report_formating_1.tableContentCellWithAlternatingColours)(dailySummary.data.reduce((a, c, i) => a + c.name + (i > 0 ? '\n' : ''), ''), index),
        ];
    });
}
function targetFilePath(suffix, dir) {
    return `${dir || './'}report-${suffix ? suffix + '-' : ''}${Date.now()}.xlsx`;
}
function generateMonthlyKupReport(monthlySummaries, suffix, dir) {
    const rows = [];
    rows.push(...reportHeader(config_1.EMPLOYEE_NAME, '????'));
    rows.push([]);
    rows.push(tableHeader(['Data', 'Ilość godzin', 'Zadania']));
    rows.push(...tableContent(monthlySummaries));
    rows.push([]);
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, targetFilePath(suffix, dir));
}
exports.generateMonthlyKupReport = generateMonthlyKupReport;
//# sourceMappingURL=monthly-kup-report-generator.js.map