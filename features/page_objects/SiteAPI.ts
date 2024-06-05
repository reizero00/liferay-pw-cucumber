import { APIRequestContext, expect, request } from "@playwright/test"
import { CompanyAPIs } from "./CompanyAPIs";
import { JSONPath } from 'jsonpath-plus'

export class SiteAPIs {
    private readonly baseURL = "http://test@liferay.com:test@localhost:8080"

    async getSiteByName(siteName: string) {
        const companyAPIs = new CompanyAPIs();
        const companyId = await companyAPIs.getCompanyId();        
        expect(companyId).toBeDefined

        const data = {
            companyId: companyId,
            parentGroupId: "0",
            site: true,
            start: 0,
            end: 100
        }

        const apiRequestContext: APIRequestContext = await request.newContext();
        const response = await apiRequestContext.get(this.baseURL + '/api/jsonws/group/get-groups', {params: data});
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        
        const filteredResponse = JSONPath(`$.[?(@.groupKey == '${siteName}')].groupId`, responseBody, undefined, undefined);
        const siteId = filteredResponse[0]
        console.log("siteId: " + siteId);
        return siteId;
    }
}