import { DailySummary } from '../data.interface';
import { Cell } from '../xlsx-utils';
import * as XLSX from 'xlsx-js-style';

export type KupReportPeriod = {
  month: number;
  year: number;
};

export type KupReportBusinessPeriods = {
  daily: number;
  monthly: number;
};

export type KupReportSummary = {
  digital: number;
  percentage: number;
};

export type KupReportGeneratorStrategy = {
  title: string;
  colsCnt: number;
  rowsCnt: number;
  generate: (summaries: DailySummary[]) => Array<XLSX.CellObject[]>;
  hoursTotal: (summaries: DailySummary[], businessPeriods: KupReportBusinessPeriods) => KupReportSummary;
};

function reportDetails(title: string, employeeName: string, period: KupReportPeriod): XLSX.WorkSheet {
  return {
    B1: new Cell('s').setPredefinedStyle('Title').setData(title).value,
    B2: new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Pracownik').value,
    C2: new Cell('s').setPredefinedStyle('CustomValue').setData(employeeName).value,
    B3: new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Okres').value,
    C3: new Cell('s').setPredefinedStyle('CustomValue').setData(`${period.month}/${period.year}`).value,
  };
}

function reportSummary(summary: KupReportSummary, colIndex: number, rowIndex: number): XLSX.WorkSheet {
  const ws = {};
  ws[
    XLSX.utils.encode_cell({
      c: colIndex,
      r: rowIndex,
    })
  ] = new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Razem godzin').value;
  ws[
    XLSX.utils.encode_cell({
      c: colIndex + 1,
      r: rowIndex,
    })
  ] = new Cell('n').setPredefinedStyle('CustomValue').setNumberFormat('0.00').setData(summary.digital).value;
  ws[
    XLSX.utils.encode_cell({
      c: colIndex,
      r: rowIndex + 1,
    })
  ] = new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Procent godzin').value;
  ws[
    XLSX.utils.encode_cell({
      c: colIndex + 1,
      r: rowIndex + 1,
    })
  ] = new Cell('n').setPredefinedStyle('CustomValue').setNumberFormat('0.00%').setData(summary.percentage).value;
  return ws;
}

function contentToSheetReduction(
  firstRow: number
): (ws: XLSX.WorkSheet, row: Array<XLSX.CellObject>, i: number) => XLSX.WorkSheet {
  return (ws: XLSX.WorkSheet, row: Array<XLSX.CellObject>, i: number): XLSX.WorkSheet => {
    ws = {
      ...ws,
      ...row.reduce((ws: XLSX.WorkSheet, cell: XLSX.CellObject, j: number) => {
        ws[
          XLSX.utils.encode_cell({
            c: j + 1,
            r: firstRow + i,
          })
        ] = cell;
        return ws;
      }, {}),
    };
    return ws;
  };
}

function concatWorkSheets(sheets: XLSX.WorkSheet[]): XLSX.WorkSheet {
  const ws = sheets.reduce((ws: XLSX.WorkSheet, cws: XLSX.WorkSheet) => ({ ...ws, ...cws }), {});
  return ws;
}

function setupColsRowsAndRef(ws: XLSX.WorkSheet, rowsCnt: number): XLSX.WorkSheet {
  return {
    A1: new Cell('s').value,
    ...ws,
    '!ref': 'A1:Z99', // @TODO get exactly range
    '!rows': [{ hpt: 30 }, { hpt: 30 }, { hpt: 30 }, { hpt: 5 }, ...Array(rowsCnt).fill({ htp: 20 })],
    '!cols': [{ wch: 3 }, { wch: 15 }, { wch: 15 }, { wch: 45 }, { wch: 45 }],
  };
}

export function generate(
  employeeName: string,
  period: KupReportPeriod,
  businessPeriods: KupReportBusinessPeriods,
  summaries: DailySummary[],
  strategy: KupReportGeneratorStrategy
): XLSX.WorkBook {
  const details = reportDetails(strategy.title, employeeName, period);
  const content = strategy.generate(summaries).reduce(contentToSheetReduction(4), {});
  const hoursSummary = reportSummary(strategy.hoursTotal(summaries, businessPeriods), 1, strategy.rowsCnt + 4);

  let ws = concatWorkSheets([details, content, hoursSummary]);
  ws = setupColsRowsAndRef(ws, strategy.rowsCnt);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws);
  return wb;
}

export function saveToFile(filePath: string, workbook: XLSX.WorkBook) {
  XLSX.writeFile(workbook, `${filePath}.xlsx`, { cellStyles: true });
}
