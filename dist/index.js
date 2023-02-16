"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const config_1 = require("./config");
const monthly_summaries_factory_1 = require("./factory/monthly-summaries.factory");
const kup_report_generator_1 = require("./kup-report-generator");
const utils_1 = require("./utils");
const wakatime_1 = require("./wakatime");
const args = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .option('month', {
    alias: 'm',
    type: 'number',
    describe: 'Set month [1-indexed]',
    required: false,
    default: new Date(Date.now()).getMonth() + 1,
})
    .option('year', {
    alias: 'y',
    type: 'number',
    describe: 'Set report year',
    required: false,
    default: new Date(Date.now()).getFullYear(),
})
    .help('h').argv;
function getRange(year, month) {
    return {
        start: (0, utils_1.startOfMonth)(year, month),
        end: (0, utils_1.endOfMonth)(year, month),
    };
}
async function main() {
    const { year, month } = args;
    const range = getRange(year, month);
    console.log(range);
    const client = new wakatime_1.WakatimeClient(config_1.WAKATIME_API_KEY);
    try {
        const wtSummaries = await client.getCurrentUserSummaries(config_1.PROJECT_NAME, range.start, range.end);
        const monthlySummaries = (0, monthly_summaries_factory_1.monthlySummariesFactory)(wtSummaries);
        (0, kup_report_generator_1.generateMonthlyKupReport)(config_1.EMPLOYEE_NAME, { year, month }, 180, monthlySummaries, `M${args.month}`, './reports/');
    }
    catch (error) {
        console.error(error);
    }
}
main();
//# sourceMappingURL=index.js.map