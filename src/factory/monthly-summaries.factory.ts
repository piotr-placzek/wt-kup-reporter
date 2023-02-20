import { DailySummary } from '../data.interface';
import { WakaTimeDailySummary } from '../wakatime';
import { dailySummariesFactory } from './daily-summaries.factory';

export function monthlySummariesFactory(wakaTimeDailySummaries: WakaTimeDailySummary[]): DailySummary[] {
    return wakaTimeDailySummaries.map(dailySummariesFactory);
}
