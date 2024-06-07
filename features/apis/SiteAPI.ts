import { APIRequestContext, expect, request } from "@playwright/test"
import { APIRequestHelper } from "../support/APIRequestHelper";
import { CompanyAPIs } from "./CompanyAPIs";
import { JSONPath } from 'jsonpath-plus'

export class SiteAPIs {
    private readonly baseURL = "http://test@liferay.com:test@localhost:8080";

    private async getSitesToTeardown() {
        const sitesIndexArray = await this.getSitesIndex();

        if (sitesIndexArray.length === 2) {
            console.log("No Site teardown necessary. No additional sites to delete.");
        } else {
            const trimSitesIndexArray = await sitesIndexArray.slice(2);
            return trimSitesIndexArray;
        }
    }

    async deleteSite(siteId: number) {
        const apiRequestHelper = new APIRequestHelper();

        const response = await apiRequestHelper.deleteRequest("/o/headless-site/v1.0/sites/", siteId);

        if (response.ok()) {
            console.log("Just deleted the site ID: " + siteId);
        } else {
            console.log(response);
            const responseBody = await response.text();
            console.error("Request Failed:", responseBody);
            throw new Error("Failing test because I was unable to delete a site.")
        }
        return response;
    }

    async getSitesIndex() {
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
        const response = await apiRequestContext.get(this.baseURL + '/api/jsonws/group/get-groups', { params: data });
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();

        const filteredResponse = JSONPath(`*.groupId`, responseBody, undefined, undefined);

        return filteredResponse;
    }

    async postSite(siteName: string) {
        const apiRequestHelper = new APIRequestHelper();

        const data = {
            name: siteName,
            externalReferenceCode: "",
            membershipType: "open",
            parentSiteKey: "",
            templateKey: "",
            templateType: ""
        };

        const response = await apiRequestHelper.postRequest("/o/headless-site/v1.0/sites", data);

        if (response.ok()) {
            const responseJSON = await response.json();
            console.log("The following site was created successfuly: " + responseJSON.name);
        } else {
            console.log(response);
            const responseBody = await response.text();
            console.error("Request Failed:", responseBody);
            throw new Error("Failing test because I was unable to add a Site.")
        }
        return response;
    }

    async tearDownSites() {
        const sitesIndexArray = await this.getSitesToTeardown();

        if (sitesIndexArray?.length > 0) {
            const deletionPromises = sitesIndexArray.map((siteId: number) => this.deleteSite(siteId));

            await Promise.all(deletionPromises);

            console.log('All sites deleted successfully!');
        }

    }
}