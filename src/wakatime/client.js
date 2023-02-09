'use strict';
const Axios = require('axios');

class WakatimeClient {
  constructor(api_key, baseURL = 'https://wakatime.com/api/v1/') {
    this.axios = Axios.create({
      baseURL,
      headers: {
        Authorization: `Basic ${Buffer.from(api_key).toString('base64')}`,
      },
    });
  }

  getCurrentUserSummaries(project, start, end) {
    return this.__extractData(
      this.axios.get('users/current/summaries', {
        params: {
          start,
          end,
          project,
        },
      })
    );
  }

  __extractData(promise) {
    return promise.then((response) => response.data).then((response) => response.data);
  }
}

module.exports = WakatimeClient;
