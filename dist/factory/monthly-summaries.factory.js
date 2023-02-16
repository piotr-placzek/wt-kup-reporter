"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthlySummariesFactory = void 0;
const daily_summaries_factory_1 = require("./daily-summaries.factory");
function monthlySummariesFactory(wakaTimeDailySummaries) {
    return wakaTimeDailySummaries.map(daily_summaries_factory_1.dailySummariesFactory);
}
exports.monthlySummariesFactory = monthlySummariesFactory;
//# sourceMappingURL=monthly-summaries.factory.js.map