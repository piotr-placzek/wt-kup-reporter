import { MonthlyReportModel, ReportRowModel } from 'src/data.interface';
import { dailySummariesToJson } from './daily-summaries-to-json.factory';
import { MonthlySummary } from './monthly-summaries.factory';

export function monthlySummariesToJson(summaries: MonthlySummary): MonthlyReportModel {
  return summaries.map(dailySummariesToJson).reduce(
    (acc: MonthlyReportModel, curr: ReportRowModel) => {
      acc.rows.push(curr);
      acc.time += curr.time;
      return acc;
    },
    {
      rows: [],
      time: 0,
    }
  );
}
