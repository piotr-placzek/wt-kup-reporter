import {
  EnrichedWakaTimeDailySummary,
  WakaTimeAllActivityJson,
  WakaTimeDailyActivityJson,
  WakaTimeDailySummary,
  WakaTimeSimpleRange,
} from '../response.interface';

export class WakaTimeAllDailyTotalsActivityJsonProcessor {
  process(projects: string[], start: Date, end: Date, json: WakaTimeAllActivityJson): WakaTimeDailySummary[] {
    const range: WakaTimeSimpleRange = this.getValidRange(json.range, start, end);
    return json.days
      .filter(this.rangeFilter(range.start, range.end))
      .reduce(this.dailyActivitiesReduceByProjects(projects), []);
  }

  private getValidRange(dataRange: WakaTimeSimpleRange, start: Date, end: Date): WakaTimeSimpleRange {
    const startValue = this.getSeconds(start);
    const endValue = this.getSeconds(end);

    if (startValue > endValue || startValue > dataRange.end || endValue < dataRange.start) {
      throw new Error('Invalid range');
    }

    return {
      start: startValue < dataRange.start ? dataRange.start : startValue,
      end: endValue > dataRange.end ? dataRange.end : endValue,
    };
  }

  private rangeFilter(start: number, end: number): (e: WakaTimeDailyActivityJson) => boolean {
    return (element: WakaTimeDailyActivityJson): boolean => {
      const dateTime = this.getSeconds(new Date(element.date));
      return dateTime >= start && dateTime <= end;
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

  private getSeconds(date: Date): number {
    return Math.floor(date.getTime() / 1000);
  }
}
