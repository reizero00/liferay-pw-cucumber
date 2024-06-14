import { Given, When, Then } from "@cucumber/cucumber"
import { SiteAPIs } from "../apis/SiteAPI";
import { LoginPage } from "../page_objects/LoginPage";
import { BasePage } from "../page_objects/BasePage";
import { BannerFragment } from "../page_objects/BannerFragment";

Given('Browser is open to {string}',{timeout: 30 * 1000}, async function (url: string) {
    await this.page.goto(url)
});

Given('{string} is logged in with the password {string}',{timeout: 30 * 1000}, async function (emailAddress: string, password: string) {
    const basePage = new BasePage(this.page);
    await this.page.goto("http://localhost:8080")

    await basePage.clickButton("Sign In");
    await basePage.fillTextField(emailAddress, "Email Address");
    await basePage.fillTextField(password, "Password");
    await basePage.clickCheckbox("Remember Me")

    const loginPage = new LoginPage(this.page);
    await loginPage.clickModalSignInButton();
    
    const bannerFragment = new BannerFragment(this.page);
    await bannerFragment.assertUserAvatarIsVisible();
});

Given('The test site: {string} is created',{timeout: 30 * 1000}, async function (siteName: string) {
    const siteAPIs = new SiteAPIs();
    await siteAPIs.createSite(siteName);
});

Then('I take a screenshot named {string}', async function (screenshotName: string) {
    const img = await this.page.screenshot({ path: `./test-results/screenshots/${screenshotName}.png`, type: "png" })
    await this.attach(img, "image/png")
});