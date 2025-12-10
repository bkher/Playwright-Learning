// @ts-check

import { expect, Page, request } from "@playwright/test";
import createOrderData from '../../testData/createOrderData.json'  with { type: 'json'};
import { loginPage } from "./loginPage.js";
import { homePageLocators } from "../../locators/APIs_Locators/homePageLocators.js";
import { utils } from "../../lib/utils.js";
let login: loginPage
let util: utils;

let orderId: any;

export class createOrderPage extends homePageLocators {
    constructor(page: Page) {
        super(page);
        login = new loginPage();
        util = new utils(page);
    }

    async createOrderUsingAPI() {
        const apiContext = await request.newContext();

        const createOrderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
            {
                data: createOrderData,
                headers: {
                    'authorization': await login.loginUsingAPIRequest(),
                    'content-type': 'application/json'
                }
            }
        )

        const orderResponseJson = await createOrderResponse.json();
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];
        console.log(orderId);
    }

    async vlidateOrderIdFroOrderPage() {
        await this.page.reload();
        await util.isDisplayed(this.orderLink,5000,'order button');
        await util.clickElement(this.orderLink);

        var countOfOrder = await this.page.locator('//tbody/tr').count();
        for(let i=0;i<countOfOrder;i++){

        let orderdText = await this.page.locator('//tbody/tr/th').allTextContents();
        if (orderdText.includes(orderId)) {
            console.log(orderId + ": is in the list")
            break;
        }
}


    }

}