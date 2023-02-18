import { BranchSummary, DailySummary } from '../data.interface';
import * as XLSX from 'xlsx-js-style';
import {
  tableContentCellWithAlternatingColours,
  signatureSection,
} from './report-formatting';
import { Cell } from 'src/xlsx-utils';

function reportHeader(employee: string, month: string): Array<Array<XLSX.CellObject>> {
  return [
    [new Cell('s').setPredefinedStyle('Title').setData('Raport czasu pracy twórczej').value],
    [
      new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Pracownik').value,
      new Cell('s').setPredefinedStyle('CustomValue').setData(employee).value,
    ],
    [
      new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Miesiąc').value,
      new Cell('s').setPredefinedStyle('CustomValue').setData(month).value,
    ],
  ];
}

function tableHeader(columns: string[]): Array<XLSX.CellObject>{
  return columns.map((columnName: string) => new Cell('s').setPredefinedStyle('TableHeader').setData(columnName.toLocaleUpperCase()).value);
}

function tableContent(monthlySummaries: DailySummary[]) {
  return monthlySummaries.map((dailySummary: DailySummary, index: number) => {
    const hours = dailySummary.data.reduce((a: number, c: BranchSummary) => a + c.time, 0);
    const branches = dailySummary.data
      .filter((b) => b.name !== 'Unknown')
      .reduce((a: string, c: BranchSummary, i: number) => a + (i > 0 ? '\n' : '') + c.name, '');
    return [
      tableContentCellWithAlternatingColours(dailySummary.date, index),
      tableContentCellWithAlternatingColours(hours, index, 'center', 'n', '0.00'),
      tableContentCellWithAlternatingColours(hours / 8, index, 'center', 'n', '0.00%', `${hours}/8`),
      tableContentCellWithAlternatingColours(branches, index, 'left'),
    ];
  });
}

function totalHours(amountOfRows: number): Array<XLSX.CellObject> {
  return [
    new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Godzin razem').value,
    new Cell('n').setPredefinedStyle('CustomValue').setHorizontalAlignment('center').setNumberFormat('0.00').setFormula(`SUM(B6:B${6 + amountOfRows - 1})`).value
  ];
}

function totalHoursPercentage(amountOfRows: number, totalWorkingHours: number): Array<XLSX.CellObject> {
  return [
    new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Procent godzin').value,
    new Cell('n')
      .setPredefinedStyle('CustomValue')
      .setHorizontalAlignment('center')
      .setNumberFormat('0.00%')
      .setFormula(`B${6 + amountOfRows}/${totalWorkingHours}`).value,
  ];
}

function targetFilePath(suffix?: string | number, dir?: string): string {
  return `${dir || './'}report-${suffix ? suffix + '-' : ''}${Date.now()}.xlsx`;
}

export function generateMonthlyKupReport(
  employeeName: string,
  range: { year: number; month: number },
  totalWorkingHours: number,
  monthlySummaries: DailySummary[],
  suffix?: string | number,
  dir?: string
): any {
  const rows = [];
  rows.push(...reportHeader(employeeName, `${range.month}/${range.year}`));
  rows.push([]);
  rows.push(tableHeader(['Data', 'Ilość godzin', '%', 'Zadania']));
  rows.push(...tableContent(monthlySummaries));
  rows.push(totalHours(monthlySummaries.length));
  rows.push(totalHoursPercentage(monthlySummaries.length, totalWorkingHours));
  rows.push([]);
  rows.push(signatureSection('Podpis pracownika', 3));
  rows.push([]);
  rows.push(signatureSection('Podpis pracodawcy', 3));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  worksheet['!cols'] = [{ wch: 19 }, { wch: 15 }, { wch: 15 }, { wch: 50 }];

  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, targetFilePath(suffix, dir), { cellStyles: true });
}
