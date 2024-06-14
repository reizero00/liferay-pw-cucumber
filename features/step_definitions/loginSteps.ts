import { Given, When, Then } from "@cucumber/cucumber"
import { LoginPage } from "../page_objects/LoginPage";
import { BannerFragment } from "../page_objects/BannerFragment";

Given('the User is on the Login Page', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.openLoginPage();
});

When('the User clicks the Sign In button in the Login modal', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.clickModalSignInButton();
});

Then(/^the User (should|should not) see the user profile menu$/, async function (visibility: string) {
    const bannerFragment = new BannerFragment(this.page);

    if (visibility === "should") {
        await bannerFragment.assertUserAvatarIsVisible();
    } else {
        await bannerFragment.assertUserAvatarIsNotVisible();
    }
});

