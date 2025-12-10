// @ts-check

import { Page } from "@playwright/test";
import { homePageLocators } from "../../locators/APIs_Locators/homePageLocators.js";
import { utils } from "../../lib/utils.js";
import { logger } from "../../lib/logger.js";
import { loginPage } from "../../pages/APIs_Pages/loginPage.js";

let util : utils
let log : logger
let login : loginPage
export class homePage extends homePageLocators{

    constructor(page:Page){
        super(page);
        util = new utils(page);
        log = new logger();
        login = new loginPage();
    }



    async validateHoemPageElements(){

        const token = await login.loginUsingAPIRequest();
        
        this.page.addInitScript(value=>{
            window.localStorage.setItem('token',value);
        },token);

        await this.page.goto(process.env.BASE_URL2!);

        await util.isDisplayed(this.zaraCoatProdcut,4000,'zara coat Product')
        await util.isDisplayed(this.addidasProduct,4000,'addidas Product')
        await util.isDisplayed(this.viewButton.first(),4000,'view Button')
        await util.isDisplayed(this.addToCartButton.first(),4000,'add To Cart Button')
    }

    async addToCartAndCheckOut(){
        await util.clickElement(this.addToCartButton.first());
        await util.isDisplayed(this.cartButton,5000,'cart button');
        await util.clickElement(this.cartButton);
        await util.isDisplayed(this.checkOut,5000,'checkout button')
        await util.clickElement(this.checkOut);

        await util.isDisplayed(this.selectCountry,5000,'select Country Field');
        await util.inputCharacterByCharacter(this.selectCountry,'India');
        await util.isDisplayed(this.selectIndia.nth(1),5000,'India Displayed');
        await util.clickElement(this.selectIndia.nth(1));

        await util.pauseFor(4000);
    }


    async createOrderusingAPI(){
        
    }
}