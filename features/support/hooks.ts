const { Before, After, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');
import { SiteAPIs } from "../apis/SiteAPI";
import { green } from "console-log-colors";
import { setDefaultTimeout } from "@cucumber/cucumber";

// Enable this on old macbook pro because it's slow
setDefaultTimeout(60 * 1000);

interface CustomWorld {
  browser: any;
  page: any;
  attach: any;
}

Before({ timeout: 60 * 1000 }, async function (this: CustomWorld, { pickle }: { pickle: any }) {
  console.log(green("====================================================================================="));
  console.log(green("Running Scenario: " + `${pickle.name}`));
  console.log(green("====================================================================================="));

  this.browser = await playwright.chromium.launch();

  const context = await this.browser.newContext();
  this.page = await context.newPage();
});

After({ timeout: 60 * 1000 }, async function (this: CustomWorld, { pickle, result }: { pickle: any, result: any }) {
  if (result?.status == Status.FAILED) {
    const img = await this.page.screenshot({ path: `./test-results/screenshots/${pickle.name}.png`, type: "png" })
    await this.attach(img, "image/png")
  }
  const siteAPIs = new SiteAPIs();

  await siteAPIs.tearDownSites();
  await this.page.close();
  await this.browser.close();
});