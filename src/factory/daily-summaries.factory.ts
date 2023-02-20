import { DailySummary } from '../data.interface';
import { WakaTimeBranchSummary, WakaTimeDailySummary } from '../wakatime';

export function dailySummariesFactory(wakaTimeDailySummary: WakaTimeDailySummary): DailySummary {
  return {
    date: wakaTimeDailySummary.range.date,
    data:
      wakaTimeDailySummary.branches?.map((branch: WakaTimeBranchSummary) => ({
        name: branch.name,
        time: parseFloat(branch.decimal),
      })) || [],
  };
}
