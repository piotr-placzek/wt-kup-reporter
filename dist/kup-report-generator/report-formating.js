"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tableContentCellWithAlternatingColours = exports.tableHeaderCell = exports.monthValueCell = exports.monthDescriptionCell = exports.employeeValueCell = exports.employeeDescriptionCell = exports.reportTitleCell = exports.border = void 0;
exports.border = {
    left: { style: 'thin', color: { rgb: 'a5a5a5' } },
    top: { style: 'thin', color: { rgb: 'a5a5a5' } },
    right: { style: 'thin', color: { rgb: 'a5a5a5' } },
    bottom: { style: 'thin', color: { rgb: 'a5a5a5' } },
};
const reportTitleCell = (v) => ({
    v,
    t: 's',
    s: {
        font: {
            sz: 22,
            color: { rgb: '595959' },
        },
        alignment: {
            vertical: 'center',
            horizontal: 'left',
        },
    },
});
exports.reportTitleCell = reportTitleCell;
const employeeDescriptionCell = (v) => ({
    v,
    t: 's',
    s: {
        font: {
            sz: 10,
            bold: true,
            color: { rgb: 'ffffff' },
        },
        fill: {
            fgColor: { rgb: '222a35' },
        },
        alignment: {
            vertical: 'center',
            horizontal: 'right',
        },
        border: exports.border,
    },
});
exports.employeeDescriptionCell = employeeDescriptionCell;
const employeeValueCell = (v) => ({
    v,
    t: 's',
    s: {
        font: {
            sz: 10,
        },
        alignment: {
            vertical: 'center',
            horizontal: 'left',
        },
        border: exports.border,
    },
});
exports.employeeValueCell = employeeValueCell;
const monthDescriptionCell = (v) => ({
    v,
    t: 's',
    s: {
        font: {
            sz: 10,
            bold: true,
            color: { rgb: 'ffffff' },
        },
        fill: {
            fgColor: { rgb: '222a35' },
        },
        alignment: {
            vertical: 'center',
            horizontal: 'right',
        },
        border: exports.border,
    },
});
exports.monthDescriptionCell = monthDescriptionCell;
const monthValueCell = (v) => ({
    v,
    t: 's',
    s: {
        font: {
            sz: 10,
        },
        alignment: {
            vertical: 'center',
            horizontal: 'left',
        },
        border: exports.border,
    },
});
exports.monthValueCell = monthValueCell;
const tableHeaderCell = (v) => ({
    v: v.toUpperCase(),
    t: 's',
    s: {
        font: {
            bold: true,
            color: { rgb: 'ffffff' },
            sz: 10,
        },
        fill: {
            fgColor: { rgb: '333f4f' },
        },
        alignment: {
            vertical: 'center',
            horizontal: 'center',
        },
        border: exports.border,
    },
});
exports.tableHeaderCell = tableHeaderCell;
const tableContentCellWithAlternatingColours = (v, index) => ({
    v,
    t: 's',
    s: {
        font: {
            sz: 9,
        },
        fill: {
            fgColor: { rgb: index % 2 ? 'd9e2f3' : 'ffffff' },
        },
        alignment: {
            vertical: 'center',
            horizontal: 'center',
        },
        border: exports.border,
    },
});
exports.tableContentCellWithAlternatingColours = tableContentCellWithAlternatingColours;
//# sourceMappingURL=report-formating.js.map