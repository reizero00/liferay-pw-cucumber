import { Page, Locator } from "@playwright/test"

interface ManagementToolbarElements {
    newButton: Locator;
}

export class ManagementToolbarFragment {
    private readonly managementToolbar = "//nav[contains(@class, 'management-bar')]";
    elements: ManagementToolbarElements;

    constructor(private readonly page: Page) {
        this.elements = {
            newButton: this.page.locator(`${this.managementToolbar}//a[text()='New']`)
        }
    }

    async clickCreateNewButton() {
        await this.elements.newButton.click();
    }
}
