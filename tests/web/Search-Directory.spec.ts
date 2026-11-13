import {test,expect} from  '../../fixtures/pageFixtures'

test('Search Directory by Job-Title',async({dashboardPage,directoryPage})=>{
    await test.step('Click on Directory Item',async()=>{
        await dashboardPage.clickOnDirectoryMenuItem();
        expect(await dashboardPage.isDirectoryPageVisible()).toBeTruthy();
    });
    await test.step('Select Title and click Search',async()=>{
        const record=await directoryPage.searchByJobTitle('Account Assistant');
        expect(record).toBeTruthy();

    })
    
})