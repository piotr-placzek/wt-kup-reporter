import { MonthlyReportModel, ReportDetails } from '../../data.interface';

export type GeneratorStrategy = (details: ReportDetails, data: MonthlyReportModel) => void;

export const strategy = {
  XLSX: () => {},
};
