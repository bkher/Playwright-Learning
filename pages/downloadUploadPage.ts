// @ts-check

import { Page } from "@playwright/test";
import { dowloadUploadLocator } from "../locators/dowloadUploadLocator.js";
import { utils } from "../lib/utils.js";
import { logger } from "../lib/logger.js";
import { ExcelUtils } from "../lib/ExcelUtils.js";

let util: utils;
let log: logger;
let excelUtil: ExcelUtils
const filePath = 'testData/download.xlsx';
export class downloadUploadPage extends dowloadUploadLocator {

    constructor(page: Page) {
        super(page);
        util = new utils(page);
        log = new logger();
        excelUtil = new ExcelUtils();
    }

    async launchTheBrowserAndHitUrl() {
        await util.navigateToUrl('https://rahulshettyacademy.com/upload-download-test/index.html', true);
    }


    async downloadFile() {
        await util.clickElement(this.downloadButton);
        await util.pauseFor(15000)
        await excelUtil.readExcel(filePath,'Sheet1');
        console.log('-----------------------------------------------------------------')
        await excelUtil.writeExcel(filePath, 'Sheet1', [
            [12, 'Product Name 2', 'Price 2',299,'winter 2'],
            [13, 'Product Name 3', 'Price 3',399,'winter 3'],
            [14, 'Product Name 4', 'Price 4',499,'winter 4'],
            [15, 'Product Name 5', 'Price 5',599,'winter 5'],
            [16, 'Product Name 6', 'Price 6',699,'winter 6'],
            [17, 'Product Name 7', 'Price 7',799,'winter 7'],
            [18, 'Product Name 8', 'Price 8',899,'winter 8'],
            [119, 'Product Name 9', 'Price 9',999,'winter 9']
        ])

        await excelUtil.readExcel(filePath,'Sheet1');
    }

    async uploadFileonWebsite(){
        await this.uploadFile.setInputFiles(filePath);
        await util.pauseFor(10000);
    }
} 