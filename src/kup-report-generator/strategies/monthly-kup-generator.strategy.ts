import { KupReportBusinessPeriods, KupReportGeneratorStrategy, KupReportSummary } from '../kup-report-generator';
import { DailySummary, BranchSummary } from '../../data.interface';
import * as XLSX from 'xlsx-js-style';
import { Cell } from '../../xlsx-utils';
import { CellStyle } from 'src/xlsx-utils/cell.styles';

function setupTable(): Array<XLSX.CellObject> {
  return [
    new Cell('s').setPredefinedStyle('TableHeader').setData('Data').value,
    new Cell('s').setPredefinedStyle('TableHeader').setData('Ilość godzin').value,
    new Cell('s').setPredefinedStyle('TableHeader').setData('Zadania').value,
    new Cell('s').setPredefinedStyle('TableHeader').setData('Opcjonalny komentarz').value,
  ];
}

function fillTable(summaries: DailySummary[]): Array<XLSX.CellObject[]> {
  return summaries.map((dailySummary: DailySummary, i: number) => {
    const time = dailySummary.data.reduce((t: number, data: BranchSummary) => t + data.time, 0);
    const branches = dailySummary.data.reduce(
      (b: string, data: BranchSummary, i: number) =>
        data.name !== 'Unknown' ? b + (i ? '\n' : '') + `${data.name}` : b,
      ''
    );
    const cellStyle: CellStyle = i % 2 ? 'TableCell' : 'TableCellAlternative';
    return [
      new Cell('s').setPredefinedStyle(cellStyle).setData(dailySummary.date).value,
      new Cell('n').setPredefinedStyle(cellStyle).setNumberFormat('0.00').setData(time).value,
      new Cell('s').setPredefinedStyle(cellStyle).setHorizontalAlignment('left').setData(branches).value,
      new Cell('s').setPredefinedStyle(cellStyle).setHorizontalAlignment('left').setVerticalAlignment('top').setData('')
        .value,
    ];
  });
}

function generate(summaries: DailySummary[]): Array<XLSX.CellObject[]> {
  return [setupTable(), ...fillTable(summaries)];
}

function hoursTotal(summaries: DailySummary[], businessPeriods: KupReportBusinessPeriods): KupReportSummary {
  const digital = summaries.reduce(
    (t: number, summary: DailySummary) => t + summary.data.reduce((t: number, data: BranchSummary) => t + data.time, 0),
    0
  );
  return {
    digital,
    percentage: digital / businessPeriods.monthly,
  };
}

export const monthlyKupGeneratorStrategy: KupReportGeneratorStrategy = {
  title: 'Miesięczny raport - KUP',
  colsCnt: 4,
  rowsCnt: 32,
  generate,
  hoursTotal,
};
