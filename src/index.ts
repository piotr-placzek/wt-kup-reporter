import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { PROJECT_NAME, WAKATIME_API_KEY } from './config';
import { WakatimeClient } from './wakatime/client';
import { Summaries } from './wakatime/summaries';
import { generate as generateMonthlyKupReport } from './kup-report-generator/monthly-kup-report-generator';

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

  console.log(args)

const client = new WakatimeClient(WAKATIME_API_KEY);
const summaries = new Summaries(client, PROJECT_NAME);

summaries.getBranchSummariesForMonth(2023, 2).then((data) => {
  generateMonthlyKupReport('./reports', data);
});
