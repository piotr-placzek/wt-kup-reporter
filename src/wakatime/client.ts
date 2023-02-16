import { Axios } from 'axios';

export class WakatimeClient {
  private readonly axios;

  constructor(api_key, baseURL = 'https://wakatime.com/api/v1/') {
    this.axios = new Axios({
      baseURL,
      headers: {
        Authorization: `Basic ${Buffer.from(api_key).toString('base64')}`,
        'Content-Type': 'application/json',
      },
    });
  }

  public getCurrentUserSummaries(project, start, end) {
    return this.axios
      .get('users/current/summaries', {
        params: {
          start,
          end,
          project,
        },
      })
      .then((r) => JSON.parse(r.data).data);
  }
}
