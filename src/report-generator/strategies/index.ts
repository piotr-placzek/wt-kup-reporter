import { MonthlyReportModel, ReportDetails } from '../../data.interface';
import { console_ReportGeneratorStrategy } from './console/console.strategy';
import { xlsx_ReportGeneratorStrategy } from './xlsx/xlsx.strategy';

export type GeneratorStrategy = (details: ReportDetails, data: MonthlyReportModel) => void;

export const strategy = {
  xlsx: xlsx_ReportGeneratorStrategy,
  console: console_ReportGeneratorStrategy,
};
