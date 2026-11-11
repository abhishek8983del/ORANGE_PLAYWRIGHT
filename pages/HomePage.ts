import { Page, Locator } from '@playwright/test';

export class HomePage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage(url: string): Promise<void> {
        await this.page.goto(url);
    }
}