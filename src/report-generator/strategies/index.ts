import { MonthlyReportModel, ReportDetails } from '../../data.interface';
import { xlsx_ReportGeneratorStrategy } from './xlsx';

export type GeneratorStrategy = (details: ReportDetails, data: MonthlyReportModel) => void;

export const strategy = {
  XLSX: xlsx_ReportGeneratorStrategy,
};
