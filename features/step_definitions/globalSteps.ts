import { Given, When, Then } from "@cucumber/cucumber"
import { chromium, Page, Browser, expect } from "@playwright/test"
const playwright = require('@playwright/test');

Given('Browser is open to {string}', async function (url) {
    await this.page.goto(url)
});

Given('{string} is logged in with the password {string}', async function (emailAddress, password) {
    await this.page.getByRole('button', { name: "Sign In" }).nth(0).click();
    await this.page.getByLabel('Email Address').fill(emailAddress);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: "Sign In" }).nth(1).click();
    await expect(this.page.getByRole('button', { name: "Test Test User Profile" })).toBeVisible();
});