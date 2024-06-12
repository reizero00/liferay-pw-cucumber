import { Page, expect } from "@playwright/test"

export class ManagementToolbarFragment {
    constructor(private readonly page: Page) {}

    private readonly managementToolbar = this.page.locator("//nav[contains(@class, 'management-bar')]");
  
    async clickCreateNewButton(ariaLabel: string) {
        await this.managementToolbar.locator("//a[@aria-label='${ariaLabel}']").click();
    }
  }