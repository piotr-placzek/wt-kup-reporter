import * as fs from 'fs-extra';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as config from './config';
import { MonthlyReportModel, ReportDetails } from './data.interface';
import { monthlySummariesToJson } from './factory/monthly-summaries-to-json.factory';
import { MonthlySummary, monthlySummariesFactory } from './factory/monthly-summaries.factory';
import { generate, strategy } from './report-generator';
import { businessDaysPerMonth, concatWakatimeMultiProjectSummariesByDate, endOfMonth, startOfMonth } from './utils';
import { WakaTimeAllDailyTotalsActivityJsonProcessor, WakaTimeDailySummary, WakatimeClient } from './wakatime';

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
  .option('file', {
    alias: 'p',
    type: 'string',
    describe: 'use data exported from wakatime',
    required: false,
  })
  .help('h').argv;

function getRange(year: number, month: number): { start: Date; end: Date } {
  return {
    start: startOfMonth(year, month),
    end: endOfMonth(year, month),
  };
}

async function main(): Promise<void> {
  const { year, month, furlough, output, ap: actualPeriod, file } = args;
  const range = getRange(year, month);

  try {
    const wtSummaries: WakaTimeDailySummary[] = [];

    if (file) {
      if (!(await fs.pathExists(file))) {
        throw new Error('File does not exist');
      }

      const fileContent = await fs.readFile(file);
      const fcAsObject = JSON.parse(fileContent);

      wtSummaries.push(
        ...new WakaTimeAllDailyTotalsActivityJsonProcessor().process(
          config.PROJECTS,
          range.start,
          range.end,
          fcAsObject
        )
      );
    } else {
      const client = new WakatimeClient(config.WAKATIME_API_KEY);
      for (const project of config.PROJECTS) {
        wtSummaries.push(...(await client.getCurrentUserSummaries(project, range.start, range.end)));
      }
    }

    const wtSummariesOrganizedByDate = concatWakatimeMultiProjectSummariesByDate(wtSummaries);

    const monthlySummaries: MonthlySummary = monthlySummariesFactory(wtSummariesOrganizedByDate);

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
