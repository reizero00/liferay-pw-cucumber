import { Given } from "@cucumber/cucumber"
import { BannerFragment } from "../page_objects/BannerFragment";
import { LoginPage } from "../page_objects/loginPage";

Given('Browser is open to {string}', async function (url) {
    await this.page.goto(url)
});

Given('{string} is logged in with the password {string}', async function (emailAddress, password) {
    const bannerFragment = new BannerFragment(this.page);
    await bannerFragment.clickSignInLink();

    const loginPage = new LoginPage(this.page);
    await loginPage.fillEmailAddress(emailAddress);
    await loginPage.fillPassword(password);
    await loginPage.clickRememberMeCheckbox();
    await loginPage.clickModalSignInButton();

    await bannerFragment.assertUserAvatarVisible();
});