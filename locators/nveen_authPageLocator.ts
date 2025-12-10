//@ts-check
import { Page, Locator } from '@playwright/test';


export class nveen_authPageLocator{
        readonly page:Page;
        readonly basicAuthHeader :Locator
        readonly basicAuthSubHeader :Locator

        constructor(page:Page){
            this.page=page
            this.basicAuthHeader = page.getByText('Basic Auth')
            this.basicAuthSubHeader =page.getByText('Congratulations! You must have the proper credentials.')

        }
 
}