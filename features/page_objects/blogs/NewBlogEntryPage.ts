import { Page, Locator } from "@playwright/test"

interface NewBlogEntryPageElements {
    selectFileButton: Locator;
    titleField: Locator;
    subtitleField: Locator;
    contentField: Locator;
    addContentButton: Locator;
    codeViewButton: Locator;
    publishButton: Locator;
    saveAsDraftButton: Locator;
    cancelButton: Locator;
}

export class NewBlogEntryPage {
    elements: NewBlogEntryPageElements;

    constructor(private readonly page: Page) {
        this.elements = {
            selectFileButton: this.page.getByRole('button', { name: "Select File" }),
            titleField: this.page.getByPlaceholder('Title *', { exact: true }),
            subtitleField: this.page.getByPlaceholder('Subtitle', { exact: true }),
            contentField: this.page.getByPlaceholder('Content'),
            addContentButton: this.page.getByRole('button', { name: "Add Content" }),
            codeViewButton: this.page.getByRole('button', { name: "Code View" }),
            publishButton: this.page.getByRole('button', { name: "Publish" }),
            saveAsDraftButton: this.page.getByRole('button', { name: "Save as Draft" }),
            cancelButton: this.page.getByRole('button', { name: "Cancel" })
        };
    }

    async fillTitleField(title: string) {
        await this.elements.titleField.fill(title);
    }

    async fillSubtitleField(subtitle: string) {
        await this.elements.subtitleField.fill(subtitle);
    }

    async fillContentField(content: string) {
        await this.elements.contentField.fill(content);
    }

    async clickSelectFileButton() {
        await this.elements.selectFileButton.click();
    }

    async clickAddContentButton() {
        await this.elements.contentField.click();
        await this.elements.addContentButton.click();
    }

    async clickCodeViewButton() {
        await this.elements.contentField.click();
        await this.elements.codeViewButton.click();
    }

    async clickPublishButton() {
        await this.elements.publishButton.click();
    }

    async clickSaveAsDraftButton() {
        await this.elements.saveAsDraftButton.click();
    }

    async clickCancelButton() {
        await this.elements.cancelButton.click();
    }

}
