import { APIRequestContext, expect, request } from "@playwright/test"
import { CompanyAPIs } from "./companyAPIs";
import { JSONPath } from 'jsonpath-plus'
import { APIRequestHelper } from "../support/APIRequestHelper";

export class SiteAPIs {
    private readonly baseURL = "http://test@liferay.com:test@localhost:8080";

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
        const response = await apiRequestContext.get(this.baseURL + '/api/jsonws/group/get-groups', {params: data});
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        
        const filteredResponse = JSONPath(`*.groupId`, responseBody, undefined, undefined);

        console.log("siteId: " + filteredResponse);
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
            templateType: ""};

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

    async tearDownSites(sitesIndexArray) {
        for (const siteId of sitesIndexArray) {
            console.log("I'm going to delete: " + siteId);

            const data = {
                groupId: siteId
            };
            const apiRequestContext: APIRequestContext = await request.newContext();
            await apiRequestContext.get(this.baseURL + '/api/jsonws/group/delete-group', { params: data })
                .then(() => console.log("I just deleted: " + siteId))
                .catch(error => console.error("Error deleting sites: ", error))
        };
    }
}