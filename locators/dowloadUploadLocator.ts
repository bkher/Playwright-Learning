// @ts-check

import { Locator, Page } from "@playwright/test";

export class dowloadUploadLocator{
    readonly page: Page;
    readonly downloadButton :Locator;
    readonly uploadFile :Locator;

    constructor(page:Page){
        this.page=page;
        this.downloadButton = page.locator('#downloadButton');
        this.uploadFile = page.locator('#fileinput');
    }
}