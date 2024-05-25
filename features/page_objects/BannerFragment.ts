import { Page, expect } from "@playwright/test"

export class BannerFragment {
    constructor(private readonly page: Page) {}

    private readonly userAvatar = this.page.getByRole('button', { name: "Test Test User Profile" });
  
    async assertUserAvatarVisible() {
        await expect(this.userAvatar).toBeVisible();
    }

    async assertUserAvatarNotVisible() {
        await expect(this.userAvatar).not.toBeVisible();
    }
  }