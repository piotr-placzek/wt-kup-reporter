"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dailySummariesFactory = void 0;
function dailySummariesFactory(wakaTimeDailySummary) {
    return {
        date: wakaTimeDailySummary.range.date,
        data: wakaTimeDailySummary.branches?.map((branch) => ({
            name: branch.name,
            time: parseFloat(branch.decimal),
        })) || [],
    };
}
exports.dailySummariesFactory = dailySummariesFactory;
//# sourceMappingURL=daily-summaries.factory.js.map