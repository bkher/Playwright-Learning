// @ts-check

import { test as baseTest, expect, Page, BrowserContext } from '@playwright/test'
import { naveen_loginPage } from '../pages/naveen_loginPage.js'
import { authPage } from '../pages/authPage.js';
import { flipkartHomePage } from '../pages/flipkartHomePage.js';
import { lambda_homepage } from '../pages/lambda_homepage.js';
import { lambda_fileUploadPage } from '../pages/lambda_fileUploadPage.js';
import { focuseTestPage } from '../pages/focuseTestPage.js';
import { loginPage } from '../pages/APIs_Pages/loginPage.js';
import { homePage } from '../pages/APIs_Pages/homePage.js';
import { createOrderPage } from '../pages/APIs_Pages/createOrderPage.js';
import { downloadUploadPage } from '../pages/downloadUploadPage.js';

const test = baseTest.extend<{
    loginPageFixure : loginPage;
    naveen_loginPageFixure: naveen_loginPage;
    authPageFixure: authPage
    contextFirst: BrowserContext;
    firstPage: Page;
    contextSecond: BrowserContext;
    secondPage: Page;
    flipkartHomePageFixure: flipkartHomePage
    lambda_homepageFixure: lambda_homepage
    lambda_fileUploadPageFixture: lambda_fileUploadPage
    focuseTestPageFixue: focuseTestPage
    homePageFixure: homePage
    createOrderPageFixure : createOrderPage
    downloadUploadPageFixure: downloadUploadPage

}>({
    downloadUploadPageFixure : async ( { page }, use)=>{
        await use(new downloadUploadPage(page))
    },
    createOrderPageFixure : async ( {page} , use)=>{
        await use(new createOrderPage(page))
    },
    homePageFixure : async ({page}, use)=>{
        await use(new homePage(page))
    },
    loginPageFixure : async({},use)=>{
        await use(new loginPage())
    },
    focuseTestPageFixue: [async ({ page }, use) => {
        await use(new focuseTestPage(page))
    },
    { timeout: 4000 }
    ],

    lambda_fileUploadPageFixture: async ({ page }, use) => {
        await use(new lambda_fileUploadPage(page));
    },

    lambda_homepageFixure: async ({ page }, use) => {
        await use(new lambda_homepage(page));
    },
    flipkartHomePageFixure: async ({ page, context }, use) => {
        await use(new flipkartHomePage(page, context));
    },
    naveen_loginPageFixure: async ({ page }, use) => {
        await use(new naveen_loginPage(page));
    },
    authPageFixure: async ({ page }, use) => {
        await use(new authPage(page))
    },

    // first context and page
    contextFirst: [async ({ browser }, use) => {
        const context = await browser.newContext();
        await use(context);
        await context.close();
    },
    { timeout: 4000 }
    ],

    firstPage: [async ({ contextFirst }, use) => {
        const page = await contextFirst.newPage();
        await use(page);
    }, { timeout: 5000 }],

    contextSecond: [async ({ browser }, use) => {
        const context = await browser.newContext();
        await use(context);
        await context.close();
    }, { timeout: 5000 }],

    secondPage: [async ({ contextSecond }, use) => {
        const page = await contextSecond.newPage();
        await use(page);
    }, { timeout: 4000 }]

});

export default test;
