import { Page, expect } from "@playwright/test"

export class BasePage {
    constructor(private readonly page: Page) {}

    async assertTextVisible(visibleText: string) {
        await expect(this.page.getByText(visibleText)).toBeVisible();
    }

    async assertTextNotVisible(visibleText: string) {
        await expect(this.page.getByText(visibleText)).not.toBeVisible();
    }
    async clickButton(buttonName: string) {
        await this.page.getByRole('button', { name: buttonName }).click();
    }

    async clickCheckbox(checkboxName: string) {
        await this.page.getByRole('checkbox', { name: checkboxName }).click();
    }

    async fillTextField(textFieldContent: string, textFieldLabel: string) {
        await this.page.getByLabel(textFieldLabel).fill(textFieldContent);
    }
}