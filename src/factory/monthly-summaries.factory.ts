import { type } from 'os';
import { DailySummary } from '../data.interface';
import { WakaTimeDailySummary } from '../wakatime';
import { dailySummariesFactory } from './daily-summaries.factory';

export type MonthlySummary = DailySummary[];

export function monthlySummariesFactory(wakaTimeDailySummaries: WakaTimeDailySummary[]): MonthlySummary {
  return wakaTimeDailySummaries.map(dailySummariesFactory);
}
