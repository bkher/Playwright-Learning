// @ts-check

import test  from "../../lib/basePage.js";


const searchData = [
  "iPhone 15",
  "Samsung Galaxy",
  "Laptop Bag",
  "Smart Watch"
];

test.describe('Vlidate different locators from Flipakart' , ()=>{
    test.beforeEach('Launch URL', async( {flipkartHomePageFixure})=>{
        await test.step('Navigate to flipkart URL', async()=>{
            await flipkartHomePageFixure.navigateToUrl();
        })
    })

    searchData.forEach((item)=>{
        test(`search for ${item}`, async  ( { flipkartHomePageFixure})=>{
            await flipkartHomePageFixure.searchBySequentiallyAndSeelctProductWithArgs(item);
        })
    })
    
    test('validate element from homepage', async ( { flipkartHomePageFixure })=>{

        await test.step('validate Flipkart homepage Elements', async()=>{
            await flipkartHomePageFixure.validateElementswithDisplayed();
            await flipkartHomePageFixure.ignPageMouseHoverAndClick();
        })
    })

    test(`validate men's Tshirt section` , async( { flipkartHomePageFixure, context })=>{
        await test.step('hover to fashion to men top waer to tshirt' , async()=>{
            await flipkartHomePageFixure.ValidateMenTshirtSection();
        })

        await test.step('find the count of element and hit next if not availble on the page' , async()=>{
            await flipkartHomePageFixure.checkProductNameValidation(context);
        })

    })

     test(`validate men's Tshirt section elements` , async( { flipkartHomePageFixure })=>{
        await test.step('hover to fashion to men top waer to tshirt' , async()=>{
            await flipkartHomePageFixure.ValidateMenTshirtSection();
        })

        await test.step('Validate elemetns inner text ' , async()=>{
            await flipkartHomePageFixure.checkDiferentLOcatorsWays();
        })

    })

    test(`search prodcut and click` , async( { flipkartHomePageFixure })=>{
        await test.step('serach the product and click' , async()=>{
            await flipkartHomePageFixure.searchBySequentiallyAndSeelctProduct();
        })
    })




})