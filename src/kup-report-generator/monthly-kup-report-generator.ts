import { BranchSummary, DailySummary } from '../data.interface';
import * as XLSX from 'xlsx-js-style';
import {
  specialDescriptionCell,
  specialValueCell,
  reportTitleCell,
  tableContentCellWithAlternatingColours,
  tableHeaderCell,
  signatureSection,
} from './report-formatting';

function reportHeader(employee: string, month: string) {
  return [
    [reportTitleCell('Raport czasu pracy')],
    [specialDescriptionCell('Pracownik'), specialValueCell(employee)],
    [specialDescriptionCell('Miesiąc'), specialDescriptionCell(month)],
  ];
}

function tableHeader(columns: string[]) {
  return columns.map((columnName: string) => tableHeaderCell(columnName));
}

function tableContent(monthlySummaries: DailySummary[]) {
  return monthlySummaries.map((dailySummary: DailySummary, index: number) => {
    return [
      tableContentCellWithAlternatingColours(dailySummary.date, index),
      tableContentCellWithAlternatingColours(
        dailySummary.data.reduce((a: number, c: BranchSummary) => a + c.time, 0),
        index,
        'center',
        '0.00'
      ),
      tableContentCellWithAlternatingColours(
        dailySummary.data.reduce((a: string, c: BranchSummary, i: number) => a + c.name + (i > 0 ? '\n' : ''), ''),
        index,
        'left'
      ),
    ];
  });
}

function totalHours(amountOfRows: number) {
  return [specialDescriptionCell('Godzin razem'), specialValueCell(`=SUM(B6:B${6 + amountOfRows - 1})`, '0.00')];
}

function totalHoursPercentage(amountOfRows: number, totalWorkingHours: number) {
  return [
    specialDescriptionCell('Procent godzin'),
    specialValueCell(`=B${6 + amountOfRows}*100/${totalWorkingHours}`, '0.00%'),
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
  rows.push(tableHeader(['Data', 'Ilość godzin', 'Zadania']));
  rows.push(...tableContent(monthlySummaries));
  rows.push(totalHours(monthlySummaries.length));
  rows.push(totalHoursPercentage(monthlySummaries.length, totalWorkingHours));
  rows.push([]);
  rows.push(signatureSection('Podpis pracownika', 2));
  rows.push(signatureSection('Podpis pracodawcy', 2));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, targetFilePath(suffix, dir));
}
