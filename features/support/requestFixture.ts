import { APIRequestContext, expect, request } from "@playwright/test"
const base = require("@playwright/test");
const { CompanyAPIs } = require("../page_objects/CompanyAPIs")

exports.test = base.test.extend({
    storeCompanyId: async (use) => {
        const companyAPIs = await new CompanyAPIs();
        const companyId = await companyAPIs.getCompanyId();        
        expect(companyId).toBeDefined();
        
        await use(companyAPIs);
    },
});

exports.expect = base.expect;