import { test } from '@playwright/test';
import { SiteAPIs } from './features/apis/SiteAPI';

test('get company', async () => {
  const siteAPIs = new SiteAPIs();

  await Promise.all([
    siteAPIs.postSite("KC SITE 1"),
    siteAPIs.postSite("KC SITE 2"),
    siteAPIs.postSite("KC SITE 3"),
  ]);

  await siteAPIs.tearDownSites();

  await siteAPIs.getSitesIndex();

});