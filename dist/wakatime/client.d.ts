import { WakaTimeDailySummary } from './response.interface';
export declare class WakatimeClient {
    private readonly axios;
    constructor(api_key: string, baseURL?: string);
    getCurrentUserSummaries(project: string, start: Date, end: Date): Promise<WakaTimeDailySummary[]>;
}
