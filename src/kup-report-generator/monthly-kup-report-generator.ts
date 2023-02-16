import { BranchSummary, DailySummary } from '../data.interface';
import * as XLSX from 'xlsx-js-style';
import {
  employeeDescriptionCell,
  employeeValueCell,
  monthDescriptionCell,
  monthValueCell,
  reportTitleCell,
  tableContentCellWithAlternatingColours,
  tableHeaderCell,
} from './report-formating';
import { EMPLOYEE_NAME } from '../config';

function reportHeader(employee: string, month: string) {
  return [
    [reportTitleCell('Raport czasu pracy')],
    [employeeDescriptionCell('Pracownik'), employeeValueCell(employee)],
    [monthDescriptionCell('Miesiąc'), monthValueCell(month)],
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
        index
      ),
      tableContentCellWithAlternatingColours(
        dailySummary.data.reduce((a: string, c: BranchSummary, i: number) => a + c.name + (i > 0 ? '\n' : ''), ''),
        index
      ),
    ];
  });
}

function targetFilePath(suffix?: string | number, dir?: string): string {
  return `${dir || './'}report-${suffix ? suffix + '-' : ''}${Date.now()}.xlsx`;
}

export function generateMonthlyKupReport(
  monthlySummaries: DailySummary[],
  suffix?: string | number,
  dir?: string
): any {
  const rows = [];
  rows.push(...reportHeader(EMPLOYEE_NAME, '????'));
  rows.push([]);
  rows.push(tableHeader(['Data', 'Ilość godzin', 'Zadania']));
  rows.push(...tableContent(monthlySummaries));
  rows.push([]);

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(rows);

  XLSX.utils.book_append_sheet(workbook, worksheet);
  XLSX.writeFile(workbook, targetFilePath(suffix, dir));
}
