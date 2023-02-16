"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summaries = void 0;
const utils_1 = require("./utils");
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
    async getBranchSummariesForMonth(year, month) {
        try {
            const wt_response = await this.wt_client.getCurrentUserSummaries(this.project, (0, utils_1.startOfMonth)(year, month), (0, utils_1.endOfMonth)(year, month));
            console.log(wt_response);
            return mapBranchSummariesPerDay(wt_response);
        }
        catch (error) {
            console.error(error.message);
        }
    }
}
exports.Summaries = Summaries;
//# sourceMappingURL=summaries.js.map