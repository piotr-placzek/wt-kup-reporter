import {
  EnrichedWakaTimeDailySummary,
  WakaTimeAllActivityJson,
  WakaTimeDailyActivityJson,
  WakaTimeDailySummary,
  WakaTimeSimpleRange,
} from '../response.interface';

export class AllActivityJsonProcessor {
  process(projects: string[], start: Date, end: Date, json: WakaTimeAllActivityJson): WakaTimeDailySummary[] {
    if (!this.validateRange(json.range, start, end)) {
      throw new Error('Missing data for given range or range is invalid (start>end)');
    }

    return json.days.filter(this.rangeFilter(start, end)).reduce(this.dailyActivitiesReduceByProjects(projects), []);
  }

  private validateRange(dataRange: WakaTimeSimpleRange, start: Date, end: Date): boolean {
    const startValue = start.getTime();
    const endValue = end.getTime();

    const valueIsInRange = (value: number): boolean => value >= dataRange.start && value <= dataRange.end;

    return startValue > endValue && valueIsInRange(startValue) && valueIsInRange(endValue);
  }

  private rangeFilter(start: Date, end: Date): (e: WakaTimeDailyActivityJson) => boolean {
    return (element: WakaTimeDailyActivityJson): boolean => {
      const dateTime = new Date(element.date).getTime();
      return dateTime >= start.getTime() && dateTime <= end.getTime();
    };
  }

  private dailyActivitiesReduceByProjects(projects: string[]): any {
    return (res: EnrichedWakaTimeDailySummary[], dailyActivity: WakaTimeDailyActivityJson): any[] =>
      res.concat(
        dailyActivity.projects
          .filter(this.projectsFilter(projects))
          .map(this.defineDailySummaryRange(dailyActivity.date))
      );
  }

  private projectsFilter(projects: string[]): (e: EnrichedWakaTimeDailySummary) => boolean {
    return (element: EnrichedWakaTimeDailySummary) => projects.includes(element.name);
  }

  private defineDailySummaryRange(date: string): any {
    return (dailyActivity: EnrichedWakaTimeDailySummary): EnrichedWakaTimeDailySummary => ({
      ...dailyActivity,
      range: { date, start: '', end: '', timezone: '', text: '' },
    });
  }
}
