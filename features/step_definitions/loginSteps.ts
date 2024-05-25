import { Given, When, Then } from "@cucumber/cucumber"
import { expect } from "@playwright/test"
import { LoginPage } from "../page_objects/loginPage";
import { BannerFragment } from "../page_objects/BannerFragment";

Given('the User enters {string} in the Email Address text field', async function (emailAddress) {
    const loginPage = new LoginPage(this.page);
    await loginPage.fillEmailAddress(emailAddress);
});

Given('the User enters {string} in the Password text field', async function (password) {
    const loginPage = new LoginPage(this.page);
    await loginPage.fillPassword(password);
});

When('the User clicks the Sign In link', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.clickSignInLink();
});

When('the User clicks the Sign In button', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.clickSignInButton();
});

Then(/^the User (should|should not) see the user profile menu$/, async function (visibility: string) {
    const bannerFragment = new BannerFragment(this.page);

    if (visibility === "should") {
        await bannerFragment.assertUserAvatarVisible();
    } else {
        await bannerFragment.assertUserAvatarNotVisible();
    }
});

Then('the User should see the error {string}', async function (incorrectPasswordError) {
    const loginPage = new LoginPage(this.page);
    await loginPage.assertIncorrectPasswordError(incorrectPasswordError);
});