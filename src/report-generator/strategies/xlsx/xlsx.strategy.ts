import * as XLSX from 'xlsx-js-style';
import { REPORTS_STORAGE_PATH } from '../../../config';
import { BusinessPeriod, MonthlyReportModel, ReportDetails, ReportRowModel } from '../../../data.interface';
import { Cell, mergeWorkSheets } from './xlsx-utils';
import { CellStyle } from './xlsx-utils/cell.styles';

const TITLE = 'Miesięczny raport - KUP';
const FILE_PATH = (m: number, y: number) => `${REPORTS_STORAGE_PATH}/KUP-report-m${m}-y${y}-${Date.now()}.xlsx`;

function reportHeader(details: ReportDetails): XLSX.WorkSheet {
  return {
    B1: new Cell('s').setPredefinedStyle('Title').setData(TITLE).value,
    B2: new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Pracownik').value,
    C2: new Cell('s').setPredefinedStyle('CustomValue').setData(details.employee).value,
    B3: new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Okres').value,
    C3: new Cell('s').setPredefinedStyle('CustomValue').setData(`${details.period.month}/${details.period.year}`).value,
  };
}

function reportContent(data: MonthlyReportModel): XLSX.WorkSheet {
  const table = {
    B5: new Cell('s').setPredefinedStyle('TableHeader').setData('Data').value,
    C5: new Cell('s').setPredefinedStyle('TableHeader').setData('Ilość godzin').value,
    D5: new Cell('s').setPredefinedStyle('TableHeader').setData('Zadania').value,
  };

  return data.rows.reduce((acc: XLSX.WorkSheet, curr: ReportRowModel, currentIndex: number) => {
    const r = 5 + currentIndex;

    const cellStyle: CellStyle = r % 2 ? 'TableCell' : 'TableCellAlternative';

    const cellAddress = {
      date: XLSX.utils.encode_cell({
        r,
        c: 1,
      }),
      time: XLSX.utils.encode_cell({
        r,
        c: 2,
      }),
      tasks: XLSX.utils.encode_cell({
        r,
        c: 3,
      }),
    };

    acc[cellAddress.date] = new Cell('s').setPredefinedStyle(cellStyle).setData(curr.date).value;

    acc[cellAddress.time] = new Cell('n')
      .setPredefinedStyle(cellStyle)
      .setNumberFormat('0.00')
      .setData(curr.time).value;

    acc[cellAddress.tasks] = new Cell('s').setPredefinedStyle(cellStyle).setData(curr.branches.join('\n')).value;

    return acc;
  }, table);
}

function reportSummary(totalTimeSpent: number, business: BusinessPeriod): XLSX.WorkSheet {
  const percentageTimeSpentValue =
    totalTimeSpent / ((business.businessDays - business.furloughDays) * business.hoursPerDay);

  return {
    B39: new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Razem godzin').value,
    B40: new Cell('s').setPredefinedStyle('CustomValueDescription').setData('Procent godzin').value,
    C39: new Cell('n').setPredefinedStyle('CustomValue').setNumberFormat('0.00').setData(totalTimeSpent).value,
    C40: new Cell('n').setPredefinedStyle('CustomValue').setNumberFormat('0.00%').setData(percentageTimeSpentValue)
      .value,
  };
}

function setupColsRowsAndRef(ws: XLSX.WorkSheet): XLSX.WorkSheet {
  return {
    A1: new Cell('s').value,
    ...ws,
    '!ref': 'A1:Z99', // @TODO get exactly range
    '!rows': [{ hpt: 30 }, { hpt: 30 }, { hpt: 30 }, { hpt: 5 }, ...Array(32).fill({ htp: 20 })],
    '!cols': [{ wch: 3 }, { wch: 15 }, { wch: 15 }, { wch: 45 }, { wch: 45 }],
  };
}

export function xlsx_ReportGeneratorStrategy(details: ReportDetails, data: MonthlyReportModel): void {
  const header = reportHeader(details);
  const content = reportContent(data);
  const summary = reportSummary(data.time, details.business);

  const worksheet = setupColsRowsAndRef(mergeWorkSheets([header, content, summary]));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet);

  XLSX.writeFile(workbook, FILE_PATH(details.period.month, details.period.year), { cellStyles: true });
}
