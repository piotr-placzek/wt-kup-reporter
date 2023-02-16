export interface BranchSummary {
  name: string;
  time: number;
}

export interface DailySummary {
  date: string;
  data: BranchSummary[];
}
