import { APIRequestContext, request } from "@playwright/test"

export class APIRequestHelper {
    private readonly baseURL = "http://test@liferay.com:test@localhost:8080";
    private readonly headers = {
        accept: "application/json",
        "Content-Type": "application/json",
    };

    async deleteRequest(endpoint: string, siteId: number) {
        return this.sendRequest("delete", `${endpoint}${siteId}`);
    }

    async getRequest(endpoint: string, data?: any) {
        return this.sendRequest("get", endpoint, data);
    }

    async postRequest(endpoint: string, data: any) {
        return this.sendRequest("post", endpoint, data);
    }

    private async sendRequest(method: string, endpoint: string, data?: any) {
        const apiRequestContext: APIRequestContext = await request.newContext({
            baseURL: this.baseURL,
            extraHTTPHeaders: this.headers,
        });

        const options = data ? { data: JSON.stringify(data) } : undefined;
        const response = await (apiRequestContext as any)[method](endpoint, options);
        return response;
    }
}
   