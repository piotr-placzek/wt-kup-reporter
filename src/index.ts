import * as XLSX from 'xlsx-js-style';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { EMPLOYEE_NAME, PROJECT_NAME, WAKATIME_API_KEY } from './config';
import { monthlySummariesFactory } from './factory/monthly-summaries.factory';
import { monthlyKupGeneratorStrategy } from './kup-report-generator';
import * as kupReportGenerator from './kup-report-generator/kup-report-generator';
import { endOfMonth, startOfMonth } from './utils';
import { WakatimeClient, WakaTimeDailySummary } from './wakatime';

const args = yargs(hideBin(process.argv))
  .option('working-hours', {
    alias: 't',
    type: 'number',
    describe: 'Total amount of working hours',
    required: true,
  })
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

function getRange(year: number, month: number): { start: Date; end: Date } {
  return {
    start: startOfMonth(year, month),
    end: endOfMonth(year, month),
  };
}

async function main(): Promise<void> {
  const { year, month } = args;
  const range = getRange(year, month);
  const filePath = `./reports/KUP-report-m${month}-y${year}-${Date.now()}`;

  console.log(range);
  console.log(filePath);

  try {
    const client = new WakatimeClient(WAKATIME_API_KEY);
    const wtSummaries: WakaTimeDailySummary[] = await client.getCurrentUserSummaries(
      PROJECT_NAME,
      range.start,
      range.end
    );
    const monthlySummaries = monthlySummariesFactory(wtSummaries);
    const data = kupReportGenerator.generate(
      EMPLOYEE_NAME,
      { month, year },
      { daily: 8, monthly: args.t },
      monthlySummaries,
      monthlyKupGeneratorStrategy
    );
    kupReportGenerator.saveToFile(filePath, data);
  } catch (error) {
    console.error(error);
  }
}

main();
