import { Given, When, Then } from "@cucumber/cucumber"
import { chromium, Page, Browser, expect } from "@playwright/test"
const playwright = require('@playwright/test');

Given('the User enters {string} in the Email Address text field', async function (emailAddress) {
    await this.page.getByLabel('Email Address').fill(emailAddress);
});

Given('the User enters {string} in the Password text field', async function (password) {
    await this.page.getByLabel('Password').fill(password);
});

When('the User clicks the Sign In link', async function () {
    await this.page.getByRole('button', { name: "Sign In" }).nth(0).click();
});

// There's a duplicate Sign In button when the modal appears. This is the button inside of the modal
When('the User clicks the Sign In button', async function () {
    await this.page.getByRole('button', { name: "Sign In" }).nth(1).click();
    await expect(this.page.locator('.modal-header')).not.toBeVisible();
});

Then('the User should see the user profile menu', async function () {
    await expect(this.page.getByRole('button', { name: "Test Test User Profile" })).toBeVisible();
});

Then('the User should not see the user profile menu', async function () {
    await expect(this.page.getByRole('button', { name: "Test Test User Profile" })).not.toBeVisible();
});

Then('the User should see the error {string}', async function (loginError) {
    await expect(this.page.getByText(loginError)).toBeVisible();
});

// Then(/^the User (should|should not) see the user profile menu$/, async function (visibility: string) {
//     const expectedCount = visibility === "should" ? 1 : 0;

//     await expect(this.page.getByRole('button', { title: "User Profile Menu" })).toHaveCount(expectedCount);
//   });