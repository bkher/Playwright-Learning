//@ts-check

import { Page, expect } from "@playwright/test";
import { nveen_authPageLocator } from "../locators/nveen_authPageLocator.js";
import { utils } from "../lib/utils.js";

let util: utils;
export class authPage extends nveen_authPageLocator {

    constructor(page: Page) {
        super(page);
        util = new utils(this.page)
        
    }

    async navigateToUrl() {

        let username = 'admin';
        let password = 'admin';
        const authHeader = 'Basic ' + btoa(username + ':' + password);
        this.page.setExtraHTTPHeaders({Authorization : authHeader});

        await this.page.goto(process.env.BASE_URL2!);
    }


    async validateFirstPage(){
        await util.validateInnerText(this.basicAuthHeader,'Basic Auth');
        await util.validateInnerText(this.basicAuthSubHeader,'Congratulations! You must have the proper credentials.')
        await util.pauseFor(5000);
    }
}