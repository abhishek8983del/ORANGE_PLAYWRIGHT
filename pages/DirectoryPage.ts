import { Page, Locator } from '@playwright/test'

export class DirectoryPage {
    private page: Page;
    private titleDropdownList: Locator
    private listOptions: Locator;
    private searchButton: Locator;
    private recordStatus: Locator;
    private recordList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.titleDropdownList = page.locator('.oxd-select-text-input').nth(0);
        this.listOptions=page.getByRole('listbox');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.recordStatus = page.locator('span.oxd-text--span').filter({hasText:'Records Found'});
        this.recordList=page.locator('.oxd-grid-4');
    }

    async searchByJobTitle(jobTitle: string): Promise<boolean> {
        await this.titleDropdownList.click();
        const option=this.listOptions.getByRole('option',{name:jobTitle});
        await option.click();
        await this.searchButton.click();
        const result=await this.recordStatus.innerText();
        const totalRecords=(text:string):number=>{
            const match=result.match(/\d+/);
            return match ? Number(match[0]):0;
        };
        const expectedCount=totalRecords(result);
        const actualCount=await this.recordList.locator('.oxd-grid-item').count();

        return expectedCount==actualCount
        
    }
}