export interface BranchSummary {
  name: string;
  time: number;
}

export interface DailySummary {
  date: string;
  data: BranchSummary[];
}

export interface ReportRowModel {
  date: string;
  time: number;
  branches: string[];
}

export interface MonthlyReportModel {
  rows: ReportRowModel[];
  time: number;
}

export interface ReportPeriod {
  month: number;
  year: number;
}

export interface BusinessPeriod {
  hoursPerDay: number;
  businessDays: number;
  furloughDays: number;
}

export interface ReportDetails {
  employee: string;
  period: ReportPeriod;
  business: BusinessPeriod;
}
