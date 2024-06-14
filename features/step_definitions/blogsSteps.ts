import { Given, When, Then } from "@cucumber/cucumber"
import { NewBlogEntryPage } from "../page_objects/blogs/NewBlogEntryPage"

When('the User enters {string} in the Blog Entry Title field', async function (content: string) {
    const newBlogEntryPage = new NewBlogEntryPage(this.page);
    await newBlogEntryPage.fillTitleField(content);
})