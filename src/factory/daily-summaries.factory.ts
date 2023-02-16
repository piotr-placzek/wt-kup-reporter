import { DailySummary } from 'src/data.interface';
import { WakaTimeBranchSummary, WakaTimeDailySummary } from 'src/wakatime';

export function dailySummariesFactory(wakaTimeDailySummary: WakaTimeDailySummary): DailySummary {
  return {
    date: wakaTimeDailySummary.range.date,
    data:
      wakaTimeDailySummary.branches?.map((branch: WakaTimeBranchSummary) => ({
        name: branch.name,
        time: branch.decimal,
      })) || [],
  };
}
