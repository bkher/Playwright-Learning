import test from '../../lib/basePage.js'

test.describe('login using API request', () => {

    test('login using API and validate HomePage element', async({ homePageFixure })=>{
        await homePageFixure.validateHoemPageElements();
        await homePageFixure.addToCartAndCheckOut();
    })

    test('create order using API', async ({createOrderPageFixure, homePageFixure})=>{
        await homePageFixure.validateHoemPageElements();
        await homePageFixure.addToCartAndCheckOut();
        await createOrderPageFixure.createOrderUsingAPI();
        await createOrderPageFixure.vlidateOrderIdFroOrderPage();
    })
})