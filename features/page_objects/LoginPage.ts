import { chromium, Page, Browser, expect } from "@playwright/test"

export class LoginPage {
    constructor(private readonly page: Page) { }

    private readonly emailAddressField = this.page.getByLabel("Email Address");
    private readonly modalHeader = this.page.locator('.modal-header');
    private readonly passwordField = this.page.getByLabel('Password');
    private readonly signInButton = this.page.locator("//div[@class='modal-content']").getByRole('button', { name: "Sign In" });
    private readonly signInLink = this.page.locator("#banner").getByRole('button', { name: "Sign In" });

    async assertIncorrectPasswordError(incorrectPasswordError: string) {
        await expect(this.page.getByText(incorrectPasswordError)).toBeVisible();
    }

    async clickSignInButton() {
        await this.signInButton.click();
        await expect(this.modalHeader).not.toBeVisible();
    }

    async clickSignInLink() {
        await this.signInLink.click();
    }

    async fillEmailAddress(emailAddress: string) {
        await this.emailAddressField.fill(emailAddress);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }
}