import { test, expect } from '@playwright/test';
import { SiteAPIs } from './features/apis/SiteAPI';
import { APIRequestHelper } from './features/support/APIRequestHelper';

test('get company', async () => {
  const siteAPIs = new SiteAPIs();

  const sitesIndexArray = await siteAPIs.getSitesIndex();
  if (sitesIndexArray.length <= 2) {
    console.log("No Site teardown necessary. No additional sites to delete.")
  }
  
  console.log(sitesIndexArray);

  const trimSitesIndexArray = await sitesIndexArray.slice(2);
  console.log(trimSitesIndexArray);

  await siteAPIs.tearDownSites(trimSitesIndexArray);

  // await siteAPIs.postNewSite("New Test Site");

  // await apiRequestHelper.postRequest("/o/headless-site/v1.0/sites",{
  //   name: "Testing 123",
  //   externalReferenceCode: "",
  //   membershipType: "open",
  //   parentSiteKey: "",
  //   templateKey: "",
  //   templateType: ""}
  // );

  await siteAPIs.postSite("KC SITE 2");

  await siteAPIs.getSitesIndex();

});