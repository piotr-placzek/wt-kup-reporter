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
    [reportTitleCell('Raport czasu pracy twórczej')],
    [specialDescriptionCell('Pracownik'), specialValueCell(employee)],
    [specialDescriptionCell('Miesiąc'), specialValueCell(month)],
  ];
}

function tableHeader(columns: string[]) {
  return columns.map((columnName: string) => tableHeaderCell(columnName));
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

function totalHours(amountOfRows: number) {
  return [
    specialDescriptionCell('Godzin razem'),
    tableContentCellWithAlternatingColours(undefined, 0, 'center', 'n', '0.00', `SUM(B6:B${6 + amountOfRows - 1})`),
  ];
}

function totalHoursPercentage(amountOfRows: number, totalWorkingHours: number) {
  return [
    specialDescriptionCell('Procent godzin'),
    tableContentCellWithAlternatingColours(
      undefined,
      1,
      'center',
      'n',
      '0.00%',
      `B${6 + amountOfRows}/${totalWorkingHours}`
    ),
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
