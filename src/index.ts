import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as config from './config';
import { MonthlyReportModel, ReportDetails } from './data.interface';
import { monthlySummariesToJson } from './factory/monthly-summaries-to-json.factory';
import { monthlySummariesFactory, MonthlySummary } from './factory/monthly-summaries.factory';
import { generate, strategy } from './report-generator';
import { businessDaysPerMonth, endOfMonth, startOfMonth } from './utils';
import { WakatimeClient, WakaTimeDailySummary } from './wakatime';

const args = yargs(hideBin(process.argv))
  .option('furlough', {
    alias: 'f',
    type: 'number',
    describe: 'Furlough days',
    required: false,
    default: 0,
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
  .option('output', {
    alias: 'o',
    type: 'enum',
    describe: 'report output format',
    required: false,
    default: 'xlsx',
  })
  .option('actual-period', {
    alias: 'ap',
    type: 'boolean',
    describe: 'report output format',
    required: false,
    default: false,
  })
  .help('h').argv;

function getRange(year: number, month: number): { start: Date; end: Date } {
  return {
    start: startOfMonth(year, month),
    end: endOfMonth(year, month),
  };
}

async function main(): Promise<void> {
  const { year, month, furlough, output, ap: actualPeriod } = args;
  const range = getRange(year, month);

  try {
    const client = new WakatimeClient(config.WAKATIME_API_KEY);

    let wtSummaries: WakaTimeDailySummary[] = [];
    for (const project of config.PROJECTS) {
      wtSummaries = wtSummaries.concat(await client.getCurrentUserSummaries(project, range.start, range.end));
    }

    const monthlySummaries: MonthlySummary = monthlySummariesFactory(wtSummaries);

    const reportData: MonthlyReportModel = monthlySummariesToJson(monthlySummaries);
    const reportDetails: ReportDetails = {
      employee: config.EMPLOYEE_NAME,
      project: config.PROJECTS.join(', '),
      period: {
        month,
        year,
      },
      business: {
        hoursPerDay: config.HOURS_PER_DAY,
        businessDays: businessDaysPerMonth(year, month, actualPeriod),
        furloughDays: furlough,
      },
    };

    const selectedStrategy = Object.keys(strategy).includes(output) ? strategy[output] : strategy.xlsx;

    generate(reportDetails, reportData, selectedStrategy);
  } catch (error) {
    console.error(error);
  }
}

main();
