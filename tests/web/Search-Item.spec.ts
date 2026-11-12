import {test,expect} from  '../../fixtures/pageFixtures'

test('Search and Click Item',async({dashboardPage})=>{

    test.step('Search Item',async()=>{
        await dashboardPage.searchMenuItem('t');
    });
    test.step('Click Item',async()=>{
        await dashboardPage.clickSearchedItem('Directory');
        const isDirectoryPage = await dashboardPage.isDirectoryPageVisible();
        expect(isDirectoryPage).toBeTruthy();
    })
})