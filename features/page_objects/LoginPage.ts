import { Page, expect } from "@playwright/test"
import { Locator } from "@playwright/test";

interface LoginPageElements {
    loginPage: string;
    modalHeader: Locator;
    modalSignInButton: Locator;
}

export class LoginPage {
    elements: LoginPageElements;

    private readonly modalIframe = "//div[@class='modal-content']";

    constructor(private readonly page: Page) {
        this.elements = {
            loginPage: "http://localhost:8080/home?p_p_id=com_liferay_login_web_portlet_LoginPortlet&p_p_lifecycle=0&p_p_state=maximized",
            modalHeader: this.page.locator('.modal-header'),
            modalSignInButton: this.page.locator(`${this.modalIframe}`)
                .getByRole('button', { name: "Sign In" }),
        };
    }
    
    // Specifically targets the Sign In button in the modal because another one exists on the page
    async clickModalSignInButton() {
        await this.elements.modalSignInButton.click();
        await expect(this.elements.modalHeader).not.toBeVisible();
    }
    
    async openLoginPage() {
        await this.page.goto(this.elements.loginPage);
    }
}
