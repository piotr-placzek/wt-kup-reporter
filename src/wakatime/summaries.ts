import { endOfMonth, startOfMonth } from './utils';

function mapBranchSummariesPerDay(wt_response) {
  return wt_response.map((summary) => ({
    date: summary.range.date,
    data: summary.branches?.map((branch_summaries) => ({
      branch: branch_summaries.name,
      time: branch_summaries.decimal,
    })),
  }));
}

export class Summaries {
  constructor(private readonly wt_client, private readonly project) {}

  /**
   * @param {number} year full year, ex. 2023
   * @param {number} month 1-indexed month, ex. 2 (for february)
   */
  public async getBranchSummariesForMonth(year, month) {
    try {
      const wt_response = await this.wt_client.getCurrentUserSummaries(
        this.project,
        startOfMonth(year, month),
        endOfMonth(year, month)
      );
      console.log(wt_response);
      return mapBranchSummariesPerDay(wt_response);
    } catch (error) {
      console.error(error.message);
    }
  }
}
