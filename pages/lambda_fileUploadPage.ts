//@ts-check

import { Page,expect } from "@playwright/test";
import { lambda_fileUploadLocator } from "../locators/lambda_fileUploadLocator.js";
import { utils } from "../lib/utils.js";
import path from "path";

let util : utils;
export class lambda_fileUploadPage extends lambda_fileUploadLocator{
    constructor(page:Page){
        super(page);
        util = new utils(page);
    }

    async uploadFile(){
        await this.fileuploadEle.setInputFiles("testData\\Bhagat.jpg");
        await util.isDisplayed(this.successFull,2000,'successFull message');
        await util.pauseFor(5000);
    }

    async multiUpload(){
        await this.multiFileUpload.setInputFiles([
            path.join('testData\\Bhagat.jpg'),
            path.join('testData\\Capture.png'),
            path.join('testData\\Capture001.png')
        ]);
        await util.pauseFor(5000)

        await this.multiFileUpload.setInputFiles([]);
        await util.pauseFor(5000)
    }

    async bufferMemory(){
        await this.upFile.setInputFiles({
            name: 'bhagat_resume.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('this is main resume')
        });
        await util.pauseFor(5000)

    }
    
}