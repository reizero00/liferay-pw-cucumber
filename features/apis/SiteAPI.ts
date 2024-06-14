import { APIRequestContext, expect, request } from "@playwright/test"
import { APIRequestHelper } from "../support/APIRequestHelper";
import { CompanyAPIs } from "./CompanyAPIs";
import { JSONPath } from 'jsonpath-plus'

export class SiteAPIs {
    private readonly baseURL = "http://test@liferay.com:test@localhost:8080";

    async createSite(siteName: string) {
        const apiRequestHelper = new APIRequestHelper();
        
        const data = {
            name: siteName,
            membershipType: "open",
            };
            
            const response = await apiRequestHelper.postRequest(`/o/headless-site/v1.0/sites`, data);

        if (!response.ok()) {
            throw new Error(`Failed to create site ${siteName}`);
        }

        const responseJSON = await response.json();
        console.log(`The following site was created successfully: ${responseJSON.name}`);
    }

    async deleteSite(siteId: number) {
        const apiRequestHelper = new APIRequestHelper();

        const response = await apiRequestHelper.deleteRequest("/o/headless-site/v1.0/sites/", siteId);

        if (!response.ok()) {
            throw new Error(`Failed to delete site ${siteId}`);
        }
    }

    async getSitesIndex() {
        const companyAPIs = new CompanyAPIs();
        const companyId = await companyAPIs.getCompanyId();
        expect(companyId).toBeDefined();

        const data = {
            companyId,
            parentGroupId: "0",
            site: true,
            start: 0,
            end: 100
        }

        const apiRequestContext = await request.newContext();
        const response = await apiRequestContext.get(`${this.baseURL}/api/jsonws/group/get-groups`, { params: data });
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();

        const filteredResponse = JSONPath<number[]>('$.[*].groupId', responseBody, undefined, undefined);

        return filteredResponse;
    }

    async getSitesToTeardown() {
        const sitesIndexArray = await this.getSitesIndex();

        return sitesIndexArray.length > 2 ? sitesIndexArray.slice(2) : [];
    }

    async tearDownSites() {
        const sitesToDelete = await this.getSitesToTeardown();

        if (sitesToDelete.length > 0) {
            await Promise.all(sitesToDelete.map(siteId => this.deleteSite(siteId)));
            console.log('All sites deleted successfully!');
        }
    }
}
