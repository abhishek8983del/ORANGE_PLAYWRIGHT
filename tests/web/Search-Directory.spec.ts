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

test('Search Directory by Location',async({dashboardPage,directoryPage})=>{
    await test.step('Click on Directory Item',async()=>{
        await dashboardPage.clickOnDirectoryMenuItem();
        expect(await dashboardPage.isDirectoryPageVisible()).toBeTruthy();
    });
    await test.step('Select Location and click Search',async()=>{
        const loc=await directoryPage.searchByLocation('Texas R&D');
        expect(loc).toBeTruthy();
    })
})