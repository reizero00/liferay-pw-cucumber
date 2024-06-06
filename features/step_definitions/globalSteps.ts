import { Given } from "@cucumber/cucumber"
import { LoginPage } from "../page_objects/loginPage";
import { BasePage } from "../page_objects/BasePage";
import { BannerFragment } from "../page_objects/BannerFragment";
import { CompanyAPIs } from "../page_objects/CompanyAPIs";
import { SiteAPIs } from "../apis/SiteAPI";

Given('Browser is open to {string}', async function (url: string) {
    await this.page.goto(url)
});

Given('{string} is logged in with the password {string}', async function (emailAddress: string, password: string) {
    const basePage = new BasePage(this.page);
    await basePage.clickButton("Sign In");
    await basePage.fillTextField(emailAddress, "Email Address");
    await basePage.fillTextField(password, "Password");
    await basePage.clickCheckbox("Remember Me")

    const loginPage = new LoginPage(this.page);
    await loginPage.clickModalSignInButton();
    
    const bannerFragment = new BannerFragment(this.page);
    await bannerFragment.assertUserAvatarVisible();
});