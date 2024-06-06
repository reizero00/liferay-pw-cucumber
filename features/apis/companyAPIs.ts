import { APIRequestContext, expect, request } from "@playwright/test"
import { APIRequestHelper } from "../support/APIRequestHelper";


export class CompanyAPIs {

    async getCompanyId() {
        const apiRequestHelper = new APIRequestHelper();
        const response = await apiRequestHelper.getRequest("/api/jsonws/company/get-companies")
       
        if (response.ok()) {
            const responseJSON = await response.json();
            const companyId = responseJSON[0].companyId;
            console.log("Stored companyId: " + companyId);
            return companyId;
        } else {
            console.log(response);
            const responseBody = await response.text();
            console.error("Request Failed:", responseBody);
            throw new Error("Failing test because I was unable to get the company ID.")
        }
    }
}