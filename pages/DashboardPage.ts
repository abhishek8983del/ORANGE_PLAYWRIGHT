import{Page,Locator} from '@playwright/test'

export class DashboardPage{
    private page: Page;
    private headingTitle: Locator;
    private inputSearch:Locator;

    constructor(page: Page){
        this.page=page;
        this.headingTitle=page.getByRole('heading',{name:'Dashboard'});
        this.inputSearch=page.getByPlaceholder('Search');
    }
    async isDashboardPageVisible():Promise<boolean>{
        await this.headingTitle.waitFor({state:'visible'});
        return await this.headingTitle.isVisible();
    }

    async searchMenuItem(searchItem:string):Promise<void>{
        await this.inputSearch.fill(searchItem);
    }
}