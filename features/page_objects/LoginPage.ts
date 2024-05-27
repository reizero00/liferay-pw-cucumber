import { Page, expect } from "@playwright/test"

export class LoginPage {
    constructor(private readonly page: Page) { }

    private readonly emailAddressField = this.page.getByLabel("Email Address");
    private readonly loginPage = "http://localhost:8080/home?p_p_id=com_liferay_login_web_portlet_LoginPortlet&p_p_lifecycle=0&p_p_state=maximized"
    private readonly modalHeader = this.page.locator('.modal-header');
    private readonly passwordField = this.page.getByLabel('Password');
    private readonly rememberMeCheckbox = this.page.locator("//div[@class='modal-content']").getByRole('checkbox', { name: "Remember Me" });
    private readonly modalSignInButton = this.page.locator("//div[@class='modal-content']").getByRole('button', { name: "Sign In" });
    private readonly portletSignInButton = this.page.getByRole('button', { name: "Sign In" });

    async assertPageError(pageError: string) {
        await expect(this.page.getByText(pageError)).toBeVisible();
    }

    async clickRememberMeCheckbox() {
        await this.rememberMeCheckbox.click();
    }

    async clickModalSignInButton() {
        await this.modalSignInButton.click();
        await expect(this.modalHeader).not.toBeVisible();
    }

    async clickPortletSignInButton() {
        await this.portletSignInButton.click();
        await expect(this.modalHeader).not.toBeVisible();
    }

    async fillEmailAddress(emailAddress: string) {
        await this.emailAddressField.fill(emailAddress);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async openLoginPage() {
        await this.page.goto(this.loginPage);
    }
}