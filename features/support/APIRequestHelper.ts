import { APIRequestContext, expect, request } from "@playwright/test"

export class APIRequestHelper {

    async deleteRequest(endpoint: string, siteId: number) {
        const apiRequestContext: APIRequestContext = await request.newContext({
            baseURL: "http://test@liferay.com:test@localhost:8080",
            extraHTTPHeaders: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
        });
        const response = await apiRequestContext.delete(endpoint + siteId, { timeout: 30000});
        return response;
    }

    async getRequest(endpoint: string, data?: any) {
        const apiRequestContext: APIRequestContext = await request.newContext({
            baseURL: "http://test@liferay.com:test@localhost:8080",
            extraHTTPHeaders: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
        });
        
        if (data !== undefined) {
            const response = await apiRequestContext.get(endpoint, { data: JSON.stringify(data) });
            return response;
        } else {
            const response = await apiRequestContext.get(endpoint);
            return response;
        }
        
    }
    
    async postRequest(endpoint: string, data: any) {
        const apiRequestContext: APIRequestContext = await request.newContext({
            baseURL: "http://test@liferay.com:test@localhost:8080",
            extraHTTPHeaders: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
        });
        const response = await apiRequestContext.post(endpoint, { data: JSON.stringify(data) });
        return response;
    }
}
   