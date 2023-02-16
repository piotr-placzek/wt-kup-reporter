"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WakatimeClient = void 0;
const axios_1 = require("axios");
class WakatimeClient {
    constructor(api_key, baseURL = 'https://wakatime.com/api/v1/') {
        this.axios = new axios_1.Axios({
            baseURL,
            headers: {
                Authorization: `Basic ${Buffer.from(api_key).toString('base64')}`,
                'Content-Type': 'application/json',
            },
        });
    }
    getCurrentUserSummaries(project, start, end) {
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
exports.WakatimeClient = WakatimeClient;
//# sourceMappingURL=client.js.map