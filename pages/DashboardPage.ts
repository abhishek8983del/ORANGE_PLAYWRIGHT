import{Page,Locator} from '@playwright/test'

export class DashboardPage{
    private page: Page;
    private dashboardTitle: Locator;
    private inputSearch:Locator;
    private searchedResult:Locator;
    private directoryTitle:Locator;
    private directoryMenuItem:Locator;

    constructor(page: Page){
        this.page=page;
        this.dashboardTitle=page.getByRole('heading',{name:'Dashboard'});
        this.inputSearch=page.getByPlaceholder('Search');
        this.searchedResult=page.locator('ul.oxd-main-menu li');
        this.directoryTitle=page.locator('h6',{hasText:'Directory'});
        this.directoryMenuItem=page.getByRole('link',{name:'Directory'})
    }
    async isDashboardPageVisible():Promise<boolean>{
        await this.dashboardTitle.waitFor({state:'visible'});
        return await this.dashboardTitle.isVisible();
    }

    async searchMenuItem(searchItem:string):Promise<void>{
        await this.inputSearch.fill(searchItem);
    }
    async clickSearchedItem(menuItem:string):Promise<void>{
        await this.searchedResult.filter({hasText:menuItem}).click();
    }
    async isDirectoryPageVisible():Promise<boolean>{
        await this.directoryTitle.waitFor({state:'visible'});
        return await this.directoryTitle.isVisible();
    }
    async clickOnDirectoryMenuItem():Promise<void>{
        await this.directoryMenuItem.click();
    }
}