'use strict';

const { startOfMonth, endOfMonth } = require('./utils');

function mapBranchSummariesPerDay(wt_response) {
  return wt_response.map((summary) => ({
    date: summary.range.date,
    data: summary.branches?.map((branch_summaries) => ({
      branch: branch_summaries.name,
      time: branch_summaries.decimal,
    })),
  }));
}

class Summaries {
  constructor(wt_client, project) {
    this.wt_client = wt_client;
    this.project = project;
  }

  /**
   * @param {number} year full year, ex. 2023
   * @param {number} month 1-indexed month, ex. 2 (for february)
   */
  async getBranchSummariesForMonth(year, month) {
    try {
      const wt_response = await this.wt_client.getCurrentUserSummaries(
        this.project,
        startOfMonth(year, month),
        endOfMonth(year, month)
      );
      return mapBranchSummariesPerDay(wt_response);
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = Summaries;
