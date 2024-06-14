import { Page, expect, Locator } from "@playwright/test"

interface BannerFragmentElements {
    userAvatar: Locator;
}

export class BannerFragment {
    elements: BannerFragmentElements;
    constructor(private readonly page: Page) {
        this.elements = {
            userAvatar: this.page.getByRole('button', { name: "Test Test User Profile" })
        }
    }

    public async assertUserAvatarIsVisible() {
        await expect(this.elements.userAvatar).toBeVisible();
    }

    public async assertUserAvatarIsNotVisible() {
        await expect(this.elements.userAvatar).not.toBeVisible();
    }
}
