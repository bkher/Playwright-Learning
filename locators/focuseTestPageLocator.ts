// @ts-check

import { Locator, Page } from "@playwright/test";
export class focuseTestPageLocator{

    readonly page:Page;

    readonly pickUsername : Locator;
    readonly fullName : Locator;
    readonly businessEmail : Locator;
    readonly phoneNumber: Locator;
    readonly countrySelector : string;

    constructor(page:Page){
        this.page=page;

        this.pickUsername = page.locator('#Form_getForm_subdomain');
        this.fullName = page.getByPlaceholder('Your Full Name*');
        this.businessEmail = page.getByRole('textbox',{name:'Email'});
        this.phoneNumber = page.locator('input[name="Contact"]');
        this.countrySelector = '#Form_getForm_Country';

        
    }
}