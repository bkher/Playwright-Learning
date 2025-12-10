//@ts-check

import { Page, expect } from "@playwright/test";
import { naveen_loginPageLocators } from "../locators/naveen_loginPageLocators.js";
import { utils } from "../lib/utils.js";
import { logger } from "../lib/logger.js";
import { randomUtils } from "../lib/randomUtils.js";

let util: utils;
let log: logger;
let random: randomUtils;
export class naveen_loginPage extends naveen_loginPageLocators {
    constructor(page: Page) {
        super(page);
        util = new utils(this.page)
        log = new logger();
        random = new randomUtils();
    }

    async navigateToUrl(page:Page) {

        await util.navigateToUrl('https://naveenautomationlabs.com/opencart/index.php?route=account/login',true);
           }
    async validateLoginInputScreen() {

        await log.logStep('Hit login button')
        await util.clickElement(this.loginButton);

        await log.logStep('validate wrning error message')
        //        await util.validateInnerText(this.warningError," Warning: No match for E-Mail Address and/or Password ")
        await util.validateInnerText(this.warningError, ' Warning: Your account has exceeded allowed number of login attempts. Please try again in 1 hour. ');

        await log.logStep('enter invalid user name')
        await util.fillField(this.username, random.getRandomEmail())

        await log.logStep('enter invalid password')
        await util.fillField(this.password, random.getRandomString(8))

        await log.logStep('Hit login button')
        await util.clickElement(this.loginButton);

        await log.logStep('Validate invalid credentials erorr.')
        await util.validateInnerText(this.invalidCredentialError, 'Warning: No match for E-Mail Address and/or Password.');

        await log.logStep('Pause for 5 seconds')
        await util.pauseFor(5000)

        await log.logStep('enter valid user name')
        await util.fillField(this.username, "dummyemail122@email.com")

        await log.logStep('enter valid password')
        await util.fillField(this.password, "Pass1234$")

        await log.logStep('Hit login button')
        await util.clickElement(this.loginButton);

        await log.logStep('Pause for 5 seconds')
        await util.pauseFor(5000)

        await log.logStep('validate after login element wish list')
        await util.clickElement(this.wishListLink);
    }

    async createNewCustomr() {

        await log.logStep('validate new customer header')
        await util.validateInnerText(this.newCustomerHeader, 'New Customer');

        await log.logStep('Validate new customer screen sub text')
        await util.validateInnerText(this.newCustomerSubText, `By creating an account you will be able to shop faster, be up to date on an order's status, and keep track of the orders you have previously made.`);

        await log.logStep('Validate continue button')
        await util.clickElement(this.continueLink);

        await log.logStep('Enter First name')
        await util.fillField(this.firstName, 'Bhagath');

        await log.logStep('Enter last name')
        await util.fillField(this.lasttName, 'Khera')

        let emilId = random.getRandomEmail('emaill.com');
        await log.logStep('Enter email address as :' + emilId)
        await util.fillField(this.email, emilId);

        let mobile = random.getRandomNumber(11111, 99999999999);
        await log.logStep('Enter telephone ' + mobile);
        await util.fillField(this.telephone, mobile)

        await log.logStep('Enter create password')
        await util.fillField(this.createPassword, 'Pass1234$')

        await log.logStep('Enter confirm password')
        await util.fillField(this.confirmPassword, 'Pass1234$')

        await log.logStep('Check privacy policy checkbox')
        await util.checkElement(this.privacyPolicyCheck);

        await log.logStep('Hit continue button')
        await util.clickElement(this.continueButton);

        await log.logStep('check account created text message')
        await util.isDisplayed(this.accountCreated, 5000, 'Account created ')

        await log.logStep('Pause for 20 Seconds')
        await util.pauseFor(10000)
    }


    async validatePage() {
        const pageTitle = await this.page.title();
        console.log(pageTitle);
        await expect(pageTitle).toEqual('Account Login');
        await this.page.screenshot({ path: 'homepage.png' })
    }

    async loginWithCredentials(email:any){

        await log.logStep('enter valid user name')
        await util.fillField(this.username, email)

        await log.logStep('enter valid password')
        await util.fillField(this.password, "Pass1234$")

        await log.logStep('Hit login button')
        await util.clickElement(this.loginButton);
    }

}