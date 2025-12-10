//@ts-check

import test from '../../lib/basePage.js'


test.describe(' check auth before use the webpage', ()=>{

    test.beforeEach('launch url', async ({ authPageFixure }) => {
        await test.step('navigate to url', async () =>{
            await authPageFixure.navigateToUrl();
        })        
    })

    test('validate page header and sub header test' , async ({authPageFixure})=>{
        await test.step('check header and sub header', async () =>{
            await authPageFixure.validateFirstPage();
        })
    })

})