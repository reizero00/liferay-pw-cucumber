import { Given, When, Then } from "@cucumber/cucumber"
import { ManagementToolbarFragment } from "../page_objects/ManagementToolbarFragment"

Given('the User clicks the {string} button in the management toolbar', async function (ariaLabel: string) {
    const managementToolbar = new ManagementToolbarFragment(this.page);

    await managementToolbar.clickCreateNewButton(ariaLabel);
});