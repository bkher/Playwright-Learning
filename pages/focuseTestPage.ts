// @ts-check
import { Page,expect } from "@playwright/test";
import { focuseTestPageLocator } from "../locators/focuseTestPageLocator.js";
import { utils } from "../lib/utils.js";
import { logger } from "../lib/logger.js";

let util : utils;
let log :logger;
export class focuseTestPage extends focuseTestPageLocator{

    constructor(page:Page){
        super(page);
        util = new utils(page);
        log = new logger();
    }

    async navigateToUrl(){
        await log.logStep('get the url from env file and launch')
        await this.page.goto(process.env.BASE_URL5!);
        await this.page.waitForLoadState("networkidle");

        await util.navigateToUrl('https://www.orangehrm.com/30-day-free-trial.com',false);

        await this.page.context().clearCookies();

    }

    async fillFreeTrialForm(){
        await util.isDisplayed(this.pickUsername,5000,'pick username');
        await util.fillField(this.pickUsername,'bhkher');
        await util.focusAndFIllTheForm(this.fullName,'Bhagirath Kher')
        await util.focusAndFIllTheForm(this.businessEmail,'bgtkher5666@email.com')
        await util.focusAndFIllTheForm(this.phoneNumber,'9898016677');
//        await this.page.selectOption(this.countrySelector,{value:'Andorra'});
        await util.selectDropDownForSelectClass(this.countrySelector,'value','Andorra')

        await util.pauseFor(5000);
        
    }
}