import { Page, expect } from "@playwright/test"

export class LoginPage {
    constructor(private readonly page: Page) {}

    private readonly loginPage = "http://localhost:8080/home?p_p_id=com_liferay_login_web_portlet_LoginPortlet&p_p_lifecycle=0&p_p_state=maximized"
    private readonly modalHeader = this.page.locator('.modal-header');
    private readonly modalSignInButton = this.page.locator("//div[@class='modal-content']").getByRole('button', { name: "Sign In" });

    // Specifically targets the Sign In button in the modal because another one exists on the page
    async clickModalSignInButton() {
        await this.modalSignInButton.click();
        await expect(this.modalHeader).not.toBeVisible();
    }
    
    async openLoginPage() {
        await this.page.goto(this.loginPage);
    }
}