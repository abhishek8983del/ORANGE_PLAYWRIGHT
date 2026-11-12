import { test, expect } from '../../fixtures/pageFixtures'


test('Valid Login', async ({  dashboardPage }) => {

    await test.step('Verify Dashboard Title is visible', async () => {
        const isDashboardPage = await dashboardPage.isDashboardPageVisible();
        expect(isDashboardPage).toBeTruthy();
    });
})

