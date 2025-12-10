// @ts-check

import test from '../../lib/basePage.js'

test.describe('verify foxus related test', ()=>{
    test.beforeEach('open url and launch', async({ focuseTestPageFixue})=>{
        await test.step('launch url in browser', async ()=>{
            await focuseTestPageFixue.navigateToUrl();
        })
    })

    test('test the focus concep', async( { focuseTestPageFixue})=>{
        await test.step('fill the form and selec country', async ()=>{
            await focuseTestPageFixue.fillFreeTrialForm();
        })
    })
})