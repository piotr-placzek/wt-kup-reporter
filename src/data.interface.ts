export interface BranchSummary {
  name: string;
  time: string;
}

export interface DailySummary {
  date: string;
  data: BranchSummary[];
}
