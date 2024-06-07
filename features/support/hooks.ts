const { Before, After, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
import { SiteAPIs } from "../apis/SiteAPI";
import { test } from "@playwright/test"

interface CustomWorld {
  browser: any;
  page: any;
  attach: any;
}



Before(async function (this: CustomWorld) {
  this.browser = await playwright.chromium.launch();

  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

After(async function (this: CustomWorld, { pickle, result }: { pickle: any, result: any }) {
  if (result?.status == Status.FAILED) {
    const img = await this.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
    await this.attach(img, "image/png")
  }
  const siteAPIs = new SiteAPIs();

  await siteAPIs.tearDownSites();
  await this.page.close({ timeout: 30000 });
  await this.browser.close({ timeout: 30000 });
});