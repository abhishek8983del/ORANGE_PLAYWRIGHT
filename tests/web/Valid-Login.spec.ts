import {test,expect} from '../../fixtures/pageFixtures'
import dotenv from 'dotenv'

dotenv.config();
const WEB_APP_URL = process.env.WEB_APP_URL!;
const APP_USERNAME = process.env.APP_USERNAME!;
const APP_PASSWORD = process.env.APP_PASSWORD!;

test('Valid Login',async({loginPage,homePage,dashboardPage})=>{

    await test.step('Open the application',async()=>{
        await homePage.navigateToHomePage(WEB_APP_URL);
    });
    await test.step('Enter the login details',async()=>{
        await loginPage.login(APP_USERNAME,APP_PASSWORD);
    });

    await test.step('Verify Dashboard Title is visible',async()=>{
        const isDashboardPage = await dashboardPage.isDashboardPageVisible();
        expect(isDashboardPage).toBeTruthy();
    });
})

