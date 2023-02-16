import { DailySummary } from 'src/data.interface';
import { WakaTimeDailySummary } from 'src/wakatime';
import { dailySummariesFactory } from './daily-summaries.factory';

export function monthlySummariesFactory(wakaTimeDailySummaries: WakaTimeDailySummary[]): DailySummary[] {
    return wakaTimeDailySummaries.map(dailySummariesFactory);
}
