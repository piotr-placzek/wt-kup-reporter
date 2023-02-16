"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const config_1 = require("./config");
const client_1 = require("./wakatime/client");
const summaries_1 = require("./wakatime/summaries");
const monthly_kup_report_generator_1 = require("./kup-report-generator/monthly-kup-report-generator");
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
console.log(args);
const client = new client_1.WakatimeClient(config_1.WAKATIME_API_KEY);
const summaries = new summaries_1.Summaries(client, config_1.PROJECT_NAME);
summaries.getBranchSummariesForMonth(2023, 2).then((data) => {
    (0, monthly_kup_report_generator_1.generate)('./reports', data);
});
//# sourceMappingURL=index.js.map