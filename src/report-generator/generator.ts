import { MonthlyReportModel, ReportDetails } from '../data.interface';
import { GeneratorStrategy } from './strategies';

export function generate(
  reportDetails: ReportDetails,
  reportData: MonthlyReportModel,
  strategy: GeneratorStrategy
): void {
  strategy(reportDetails, reportData);
}
