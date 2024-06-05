import { Given, When, Then } from "@cucumber/cucumber"
import { BasePage } from "../page_objects/BasePage";

Given('the User enters {string} in the {string} text field', async function (textFieldContent: string, textFieldLabel: string) {
    const basePage = new BasePage(this.page);
    await basePage.fillTextField(textFieldContent, textFieldLabel)
    
});

When('the User clicks the {string} button', async function (buttonName: string) {
    const basePage = new BasePage(this.page);
    await basePage.clickButton(buttonName);
});

When('the User clicks the {string} checkbox', async function (checkboxName: string) {
    const basePage = new BasePage(this.page);
    await basePage.clickCheckbox(checkboxName);
});

Then(/^the User (should|should not) see the text: "([^"]*)"$/, async function (visibility: string, text: string) {
    const basePage = new BasePage(this.page);
    if (visibility === "should") {
        await basePage.assertTextVisible(text);
    } else {
        await basePage.assertTextNotVisible(text);
    }
});