import { test } from '@playwright/test';
import { SiteAPIs } from './features/apis/SiteAPI';

test('get company', async () => {
  const siteAPIs = new SiteAPIs();

  await Promise.all([
    siteAPIs.createSite("KC SITE 1"),
    siteAPIs.createSite("KC SITE 2"),
    siteAPIs.createSite("KC SITE 3"),
  ]);

  await siteAPIs.tearDownSites();

  await siteAPIs.getSitesIndex();

});