import { APIRequestContext, expect, request } from "@playwright/test"


export class CompanyAPIs {
    private readonly baseURL = "http://test@liferay.com:test@localhost:8080"

    async getCompanyId() {
        const apiRequestContext = await request.newContext();
        const response = await apiRequestContext.get(this.baseURL+'/api/jsonws/company/get-companies');
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        const companyId = responseBody[0].companyId;
        console.log("companyId: " + companyId);
        return companyId;
    }
}