import { Axios } from 'axios';
import { WakaTimeDailySummary } from './response.interface';

export class WakatimeClient {
  private readonly axios;

  constructor(api_key: string, baseURL: string = 'https://wakatime.com/api/v1/') {
    this.axios = new Axios({
      baseURL,
      headers: {
        Authorization: `Basic ${Buffer.from(api_key).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  public getCurrentUserSummaries(project: string, start: Date, end: Date): Promise<WakaTimeDailySummary[]> {
    return this.axios
      .get('users/current/summaries', {
        params: {
          start: start.toISOString(),
          end: end.toISOString(),
          project,
        },
      })
      .then((r) => JSON.parse(r.data).data);
  }
}
