export class ToDoPage {

    constructor(page) {
        this.page = page;
        this.inputBox = this.page.locator("input.new-todo")
    }
}