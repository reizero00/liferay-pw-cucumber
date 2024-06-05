import { test, expect } from '@playwright/test';
import { CompanyAPIs } from './features/page_objects/CompanyAPIs';

test('get company', async () => {
  const companyAPIs = new CompanyAPIs();
  await companyAPIs.getCompanyId();
});