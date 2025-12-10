// @ts-check
import { Page ,Locator} from "@playwright/test"

export class lambda_fileUploadLocator{

        readonly page:Page;
        readonly fileuploadEle :Locator;
        readonly successFull :Locator

        readonly upFile : Locator;

        readonly multiFileUpload:Locator;


        constructor(page:Page){
            this.page=page;
            this.fileuploadEle = page.locator('#file');
            this.successFull = page.getByText('File Successfully Uploaded');

            this.multiFileUpload = page.locator('#filesToUpload');

            this.upFile = page.locator('input[name="upfile"]');


        }
}