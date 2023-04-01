import { Table } from 'console-table-printer';
import { MonthlyReportModel, ReportDetails, ReportRowModel } from '../../../data.interface';
import { spentToTotalTimeRatio } from '../../../utils';

function renderTable(rows: ReportRowModel[]) {
  const table = new Table({
    filter: (row: ReportRowModel) => row.time > 0,
    columns: [
      { name: 'date', alignment: 'center' },
      { name: 'time', alignment: 'center' },
      { name: 'branches', alignment: 'left', maxLen: 50 },
    ],
  });

  table.addRows(
    rows.map((row: ReportRowModel) => ({
      date: row.date,
      time: Math.round((row.time + Number.EPSILON) * 100) / 100,
      branches: row.branches.join(', '),
    }))
  );

  return table.render();
}

export function console_ReportGeneratorStrategy(details: ReportDetails, data: MonthlyReportModel): void {
  console.log(details);
  console.log(renderTable(data.rows));
  console.log('Total time (decimal):\t', data.time);
  console.log('Total time (percentage): ', spentToTotalTimeRatio(data.time, details.business) * 100);
}
