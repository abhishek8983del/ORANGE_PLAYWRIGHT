import {test,expect} from  '../../fixtures/pageFixtures'

test('Search and Click Item',async({dashboardPage})=>{

    await test.step('Search Item',async()=>{
        await dashboardPage.searchMenuItem('t');
    });
    await test.step('Click Item',async()=>{
        await dashboardPage.clickSearchedItem('Directory');
        const isDirectoryPage = await dashboardPage.isDirectoryPageVisible();
        expect(isDirectoryPage).toBeTruthy();
    })
})