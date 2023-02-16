import { DailySummary } from '../data.interface';
export declare function generateMonthlyKupReport(employeeName: string, range: {
    year: number;
    month: number;
}, totalWorkingHours: number, monthlySummaries: DailySummary[], suffix?: string | number, dir?: string): any;
