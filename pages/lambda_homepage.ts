// @ts-check

import { Page, expect } from "@playwright/test";
import { lambda_homepageLocator } from "../locators/lambda_homepageLocator.js";
import { utils } from "../lib/utils.js";
import { logger } from "../lib/logger.js";


let util: utils;
let log: logger;
export class lambda_homepage extends lambda_homepageLocator {
    constructor(page: Page) {
        super(page);
        util = new utils(page);
        log = new logger();
    }

    async navigateToUrl() {

        await util.navigateToUrl('https://www.orangehrm.com/30-day-free-trial.com',true);
    }


    async dragAndDropFeaure() {
        await this.dragEle1.dragTo(this.dragToEle);
        await this.dragEle2.dragTo(this.dragToEle);

        await util.isDisplayed(this.droppedEle1,2000,"dragEle1")
        await util.isDisplayed(this.droppedEle2,2000,"dragEle2")

        await this.dragtoTarget.dragTo(this.dropHere);

        await util.pauseFor(10000);
    }

    async dragAndDropFeaureWithMouse() {
        await this.dragEle1.hover();
        await this.page.mouse.move(482,100);
      //  dragTo(this.dragToEle);
        await this.dragEle2.hover();
        await this.page.mouse.move(482,100);
      //  dragTo(this.dragToEle);

        await util.isDisplayed(this.droppedEle1,2000,"dragEle1")
        await util.isDisplayed(this.droppedEle2,2000,"dragEle2")

        await this.dragtoTarget.hover();
        await this.page.mouse.move(150,150)
        //dragTo(this.dropHere);

        await util.pauseFor(10000);
    }
}