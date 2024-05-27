import { Page, expect } from "@playwright/test"

export class BannerFragment {
    constructor(private readonly page: Page) {}

    private readonly userAvatar = this.page.getByRole('button', { name: "Test Test User Profile" });
    private readonly signInLink = this.page.locator("#banner").getByRole('button', { name: "Sign In" });
  
    async assertUserAvatarVisible() {
        await expect(this.userAvatar).toBeVisible();
    }

    async assertUserAvatarNotVisible() {
        await expect(this.userAvatar).not.toBeVisible();
    }

    async clickSignInLink() {
        await this.signInLink.click();
    }
  }