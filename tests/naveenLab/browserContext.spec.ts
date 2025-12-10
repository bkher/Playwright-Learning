// @ts-check


import test from '../../lib/basePage.js'
import { logger } from '../../lib/logger.js';
import { naveen_loginPage } from '../../pages/naveen_loginPage.js';
import testdat from '../../testData/credentials.json' with { type: 'json'};

test('login test', async ({ firstPage, secondPage }) => {

    const firstLogin = new naveen_loginPage(firstPage);
    const secondLogin = new naveen_loginPage(secondPage);

    await test.step('open first window', async () => {
        await firstLogin.navigateToUrl(firstPage);
        await firstLogin.loginWithCredentials(testdat.user1);
    });

    await test.step('open second window', async () => {
        await secondLogin.navigateToUrl(secondPage);
        await secondLogin.loginWithCredentials(testdat.user2);
    });
});
