import{Page,Locator} from '@playwright/test'

export class DashboardPage{
    private page: Page;
    private headingTitle: Locator;

    constructor(page: Page){
        this.page=page;
        this.headingTitle=page.getByRole('heading',{name:'Dashboard'});
    }
    async isDashboardPageVisible():Promise<boolean>{
         return await this.headingTitle.isVisible();
    }
}