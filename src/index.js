'use strict';
const CONFIG = require('./config');
const WakatimeClient = require('./wakatime/client');
const Summaries = require('./wakatime/summaries');
const generateMonthlyKupReport = require('./kup-report-generator/monthly-kup-report-generator');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const args = yargs(hideBin(process.argv))
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

const client = new WakatimeClient(CONFIG.WAKATIME_API_KEY);
const summaries = new Summaries(client, CONFIG.PROJECT_NAME);

summaries.getBranchSummariesForMonth(2023, 2).then((data) => {
  generateMonthlyKupReport('./reports', data);
});
