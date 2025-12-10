// @ts-check

import { Locator, Page } from "@playwright/test";

export class homePageLocators{
    readonly page: Page;
    readonly zaraCoatProdcut: Locator
    readonly addidasProduct :Locator
    readonly viewButton : Locator
    readonly addToCartButton : Locator
    readonly continueShoppingLink : Locator
    readonly cartButton :Locator
    readonly checkOut :Locator;

    readonly selectCountry : Locator;
    readonly selectIndia : Locator;

    readonly orderLink : Locator;



    constructor(page:Page){
        this.page=page;
        this.zaraCoatProdcut = this.page.getByText('ZARA COAT 3');
        this.addidasProduct =  this.page.getByText('ADIDAS ORIGINAL');
        this.viewButton =  this.page.getByRole('button',{name:' View'});
        this.addToCartButton = this.page.getByRole('button',{name:' Add To Cart'});
        this.continueShoppingLink = this.page.getByRole('link',{name:'Continue Shopping'});
        this.cartButton = this.page.locator('//*[@routerlink="/dashboard/cart"]');
        this.checkOut = this.page.getByRole('button',{name:'Checkout'});
        this.selectCountry = this.page.getByPlaceholder('Select Country');
        this.selectIndia =  this.page.getByRole('button',{name:' India'})

        this.orderLink =  this.page.locator('//button[@routerlink="/dashboard/myorders"]');
        

    }
}