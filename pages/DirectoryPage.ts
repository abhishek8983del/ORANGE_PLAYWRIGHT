import { Page, Locator } from '@playwright/test';

export class DirectoryPage {
    private page: Page;
    private titleDropdownList: Locator;
    private locationDropdownList:Locator;
    private listOptions: Locator;
    private searchButton: Locator;
    private recordStatus: Locator;
    private recordList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleDropdownList = page.locator('.oxd-select-text-input').nth(0);
        this.locationDropdownList=page.locator('.oxd-select-text-input').nth(1);
        this.listOptions = page.getByRole('listbox');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.recordStatus = page.locator('span.oxd-text--span').filter({ hasText: 'Records Found' });
        this.recordList = page.locator('.oxd-grid-4');
    }
    private async selectAndSearch(dropdown: Locator,value: string): Promise<void> {
        await dropdown.click();
        await this.listOptions.getByRole('option', { name: value, exact: true }).click();
        await this.searchButton.click();
    }
    async isRecordCountCorrect(): Promise<boolean> {
        const result = await this.recordStatus.innerText();
        const match = result.match(/\d+/);
        const expectedCount = match ? Number(match[0]) : 0;
        const actualCount =await this.recordList.locator('.oxd-grid-item').count();
        return expectedCount === actualCount;
}

    async searchByJobTitle(jobTitle: string): Promise<void> {
        await this.selectAndSearch(this.titleDropdownList, jobTitle);
    }

    async searchByLocation(location:string):Promise<void>{
        await this.selectAndSearch(this.locationDropdownList, location);
    }
}