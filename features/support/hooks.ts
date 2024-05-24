const { Before, After, Status } = require("@cucumber/cucumber");
const playwright = require('@playwright/test');

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

  await this.page.close();
  await this.browser.close();
});