export interface EnrichedWakaTimeDailySummary extends WakaTimeDailySummary {
  name: string;
}

export interface WakaTimeDailySummary {
  branches: WakaTimeBranchSummary[];
  //   categories: unknown[];
  //   dependencies: unknown[];
  //   editors: unknown[];
  //   entities: unknown[];
  grand_total: WakaTimeGrandTotal;
  //   languages: unknown[];
  //   machines: unknown[];
  //   operating_systems: unknown[];
  range: WakaTimeSummaryRange;
}

export interface WakaTimeBranchSummary {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  name: string;
  percent: number;
  seconds: number;
  text: string;
  total_seconds: number;
}

export interface WakaTimeGrandTotal {
  decimal: string;
  digital: string;
  hours: number;
  minutes: number;
  text: string;
  total_seconds: number;
}

export interface WakaTimeSummaryRange {
  date: string;
  end: string;
  start: string;
  text: string;
  timezone: string;
}

export interface WakaTimeSimpleRange {
  start: number;
  end: number;
}
export interface WakaTimeDailyActivityJson {
  date: string;
  grand_total: WakaTimeGrandTotal;
  projects: EnrichedWakaTimeDailySummary[];
}

export interface WakaTimeAllActivityJson {
  user: unknown;
  range: WakaTimeSimpleRange;
  days: WakaTimeDailyActivityJson[];
}
