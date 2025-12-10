// @ts-check

import { Locator, Page } from "@playwright/test";
import { utils } from "../lib/utils.js";

export class flipkartHomePageLocator{

    readonly page:Page;
    readonly searchProduct : Locator
    readonly minutes :Locator;
    readonly mobileTablet :Locator;

    readonly loginButton :Locator;
    readonly newCustomer : Locator;

    readonly fashionHover : Locator;
    readonly mensTopWear :Locator;
    readonly menTsirt : Locator;
    readonly numberOfTShirt : Locator;
    readonly clickTshirt : Locator;
    readonly nextButton :Locator

    readonly addToCartButton :Locator;

    readonly customerRating : Locator;
    readonly sleeveTypeText :Locator;

    readonly selectMinAmount :string
    readonly selectMxmount : string;



    constructor(page:Page){
        this.page=page;
        this.searchProduct = page.getByPlaceholder('Search for products, brands and more')
        this.mobileTablet = page.locator('._3sdu8W').getByRole('link', { name: 'Mobiles & Tablets' })
        this.minutes = page.locator('._3sdu8W').getByRole('link', { name: 'Minutes', exact: true })
    
        this.loginButton =page.locator('._2msBFL').getByRole('link', { name:'Login Login'});
        this.newCustomer = page.locator('._2msBFL').getByRole('link', {name:'My profile'})

        this.fashionHover = page.locator('._3sdu8W').getByText('Fashion');
        this.mensTopWear = page.locator('._16rZTH').getByRole('link', {name:"Men's Top Wear"});
        this.menTsirt = page.locator('._31z7R_').getByRole('link', {name:"Men's T-Shirts"});

        this.numberOfTShirt = page.locator("//*[@data-id='TSHH76A4XBMWVQ9N']").getByTitle('Men Solid Round Neck Polyester Black T-Shirt');
        this.clickTshirt = page.locator("//*[@data-id='TSHH76A4XBMWVQ9N']").getByRole('link',{name:'Men Solid Round Neck Polyester Black T-Shirt'});
        this.nextButton = page.locator('.WSL9JP').getByRole('link',{ name: 'Next'});

        this.addToCartButton = page.getByRole('button',{ name:'Add to cart'});

        this.customerRating = page.locator('label').filter({ hasText:'4★ & above'});
        this.sleeveTypeText = page.locator("//div[contains(text(),'Sleeve Type')]");

        this.selectMinAmount = 'div.suthUA>select';
        this.selectMxmount = 'div.tKgS7w>select';



    }
}