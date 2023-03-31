import { BranchSummary, DailySummary, ReportRowModel } from 'src/data.interface';

const IGNORED_BRANCHES = ['Unknown', 'master', 'main'];

export function dailySummariesToJson(summaries: DailySummary): ReportRowModel {
  return summaries.data.reduce(
    (acc: ReportRowModel, curr: BranchSummary) => {
      acc.time += curr.time;
      if (curr.name && !IGNORED_BRANCHES.includes(curr.name)) {
        acc.branches.push(curr.name);
      }
      return acc;
    },
    {
      date: summaries.date,
      time: 0,
      branches: [],
    }
  );
}
