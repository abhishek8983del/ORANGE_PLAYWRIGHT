import {test as base} from '@playwright/test'
import dotenv from 'dotenv'

import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { DashboardPage } from '../pages/dashboardPage';

dotenv.config();

const APP_URL=process.env.WEB_APP_URL||'http://localhost:3000';

type PageFixtures={
    loginPage:LoginPage;
    homePage:HomePage;
    dashboardPage:DashboardPage;
};

export const test=base.extend<PageFixtures>({
        homePage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await use(new HomePage(page));
    },
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async({page},use)=>{
        await use(new DashboardPage(page));
    }
});

export {expect} from '@playwright/test';
