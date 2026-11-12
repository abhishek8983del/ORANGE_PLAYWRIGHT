import { test as base } from '@playwright/test'
import dotenv from 'dotenv'

import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

dotenv.config();

const APP_URL = process.env.WEB_APP_URL!
const APP_USERNAME = process.env.APP_USERNAME!;
const APP_PASSWORD = process.env.APP_PASSWORD!;

type PageFixtures = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
};

export const test = base.extend<PageFixtures>({

    loginPage: async ({ page }, use) => {
        await page.goto(APP_URL);
        await page.getByPlaceholder('Username').fill(APP_USERNAME);
        await page.getByPlaceholder('Password').fill(APP_PASSWORD);
        await page.getByRole('button', { name: 'Login' }).click();
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page,loginPage:_loginPage }, use) => {
        await use(new DashboardPage(page));
    }
});

export { expect } from '@playwright/test';
