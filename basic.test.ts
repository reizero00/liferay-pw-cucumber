import { test } from '@playwright/test';
import { SiteAPIs } from './features/apis/SiteAPI';

test('get company', async () => {
  const siteAPIs = new SiteAPIs();
  
  await siteAPIs.postSite("KC SITE 1");
  await siteAPIs.postSite("KC SITE 2");
  await siteAPIs.postSite("KC SITE 3");

  await siteAPIs.tearDownSites();

  await siteAPIs.getSitesIndex();

});