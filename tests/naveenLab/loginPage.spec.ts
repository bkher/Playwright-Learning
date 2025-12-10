//@ts-check

import test from '../../lib/basePage.js'
import { logger } from '../../lib/logger.js';
import { Browser } from '@playwright/test';

test.describe('login and create customer flow', () => {

    test.beforeEach('launch url', async ({ naveen_loginPageFixure,page }) => {
        await test.step('navigate to url', async () =>{
            await naveen_loginPageFixure.navigateToUrl(page);
        })        
    })
    test('verify login screen test using invalid credentil and empty credentials', async ({ naveen_loginPageFixure }) => {
        
        await test.step('validated the login input screen and error screen with empty ,invalid and valid input', async () =>{
            await naveen_loginPageFixure.validateLoginInputScreen();
        })        
    })
    test('verify the user is able to craete new customer with details', async ({ naveen_loginPageFixure }) => {
    
        await test.step('validate create new customer and fill details and create new with existing email', async () =>{
            await naveen_loginPageFixure.createNewCustomr();
        })  
    })

    test('verify page with few Methods', async ({ naveen_loginPageFixure})=>{
        await test.step('validate first page with Playwright methods', async()=>{
            await naveen_loginPageFixure.validatePage();
        })
    })

    /*
    test.afterEach('close the browser', async( { browser})=>{
        await test.step('close the browser' , async()=>{
            await browser.close();
        })
    })
   */
})
