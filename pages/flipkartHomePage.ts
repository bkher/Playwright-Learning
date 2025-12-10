// @ts-check

import { Page, expect ,BrowserContext} from "@playwright/test";
import { flipkartHomePageLocator } from "../locators/flipkartHomePageLocator.js";
import { utils } from "../lib/utils.js";
import { logger } from "../lib/logger.js";

let util : utils;
let log: logger;
export class flipkartHomePage extends flipkartHomePageLocator {

    constructor(page : Page, context:BrowserContext){
        super(page);
        util = new utils(this.page);
        log = new logger();
        this.context = context;
    }
      context: BrowserContext;


    async navigateToUrl(){
        await util.navigateToUrl('https://www.flipkart.com',false);
        await this.page.waitForLoadState('load');

    }

    async ignPageMouseHoverAndClick(){
        await util.isDisplayed(this.loginButton,3000,'Login Button');

        await this.loginButton.hover();

        await util.validateInnerText(this.newCustomer,"My Profile");
    }

    async validateElementswithDisplayed(){
        await util.isDisplayed(this.searchProduct,2000,"search Product text box");
        await util.isDisplayed(this.minutes,2000,"minutes link")
        await util.isDisplayed(this.mobileTablet,3000,"Mobile tablet link")
    }

    async ValidateMenTshirtSection(){
        await util.hoverOn(this.fashionHover);
        await util.hoverOn(this.mensTopWear);
        await util.clickElement(this.menTsirt);
    }


    async checkProductNameValidation(context:any){
        let numberEle = await util.getTheNumberOfElement(this.numberOfTShirt);
        console.log(numberEle);
        await util.pauseFor(4000)
        while(numberEle == 0){
            await util.clickElement(this.nextButton);
            numberEle = await util.getTheNumberOfElement(this.numberOfTShirt);
        }

        /**
         * You are telling Playwright:
         *     “A new tab will open soon. Start waiting now.”
         * Then you click something that opens the new tab.
         * Then you collect the new tab when it appears.
         */

        const newTabPromise = this.context.waitForEvent('page');

        await Promise.all([
            newTabPromise,
            util.clickElement(this.clickTshirt)
        ]);

    //    await util.clickElement(this.clickTshirt);       
        const newTab = await newTabPromise;
        await newTab.waitForLoadState("load");
        console.log('new tab title: '+await newTab.title());

        await newTab.getByRole('button',{ name:'Add to cart'}).click();

    }

    async checkDiferentLOcatorsWays(){
        await util.validateInnerText(this.customerRating,"4★ & above");
        await util.validateInnerText(this.sleeveTypeText,'SLEEVE TYPE');

        const allOption = await this.page.$$(this.selectMinAmount +'> option');
        console.log(allOption.length);
        for(const i of allOption){
            const name = await i.textContent();
            console.log(name);
            if(name=='₹300'){
                await this.page.selectOption(this.selectMinAmount,{label:name});
                break;
            }
        }

        const allOption1 = await this.page.$$(this.selectMxmount +'> option');
        console.log(allOption1.length);
        for(const i of allOption1){
            const name = await i.textContent();
            console.log(name);
            if(name =='₹700'){
                await this.page.selectOption(this.selectMxmount,{label:name});
                break;
            }
        }
        await util.pauseFor(5000);
    }

    async searchBySequentiallyAndSeelctProduct(){
        await util.isDisplayed(this.searchProduct,3000,'search Product');
        await util.inputCharacterByCharacter(this.searchProduct,'Smart Watch');
        await util.pauseFor(5000)
        await util.clickElement(this.page.getByText('smart watch boat'))
        await util.pauseFor(5000)

    }

    async searchBySequentiallyAndSeelctProductWithArgs(search:any){
        await util.isDisplayed(this.searchProduct,4000,'search Product');
        await util.inputCharacterByCharacter(this.searchProduct,search);
        await util.pauseFor(5000)
    //    await util.clickElement(this.page.getByText('smart watch boat'))
    //    await util.pauseFor(5000)

    }

 }