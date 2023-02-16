"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureSection = exports.tableContentCellWithAlternatingColours = exports.tableHeaderCell = exports.specialValueCell = exports.specialDescriptionCell = exports.reportTitleCell = void 0;
const border = {
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
const specialDescriptionCell = (v) => ({
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
        border,
    },
});
exports.specialDescriptionCell = specialDescriptionCell;
const specialValueCell = (v, numFmt = '0') => ({
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
        border,
        numFmt,
    },
});
exports.specialValueCell = specialValueCell;
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
        border,
    },
});
exports.tableHeaderCell = tableHeaderCell;
const tableContentCellWithAlternatingColours = (v, index, vAlign = 'center', numFmt = '0') => ({
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
            vertical: vAlign,
            horizontal: 'center',
        },
        border,
        numFmt,
    },
});
exports.tableContentCellWithAlternatingColours = tableContentCellWithAlternatingColours;
const signatureSection = (v, colspan) => {
    const signaturePlaceholder = [];
    for (let i = 0; i < colspan; i++) {
        signaturePlaceholder.push({
            t: 's',
            s: {
                border: {
                    bottom: border.bottom,
                },
            },
        });
    }
    return [(0, exports.specialDescriptionCell)(v), ...signaturePlaceholder];
};
exports.signatureSection = signatureSection;
//# sourceMappingURL=report-formatting.js.map