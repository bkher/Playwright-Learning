//@ts-check

import { Page, Locator } from '@playwright/test';

export class naveen_loginPageLocators{

    readonly page:Page;
    readonly username : Locator;
    readonly password : Locator;
    readonly loginButton :Locator;
    readonly warningError : Locator;
    readonly invalidCredentialError : Locator;
    readonly wishListLink :Locator;


    // create new customer
    readonly newCustomerHeader : Locator
    readonly newCustomerSubText : Locator
    readonly continueLink : Locator

    //new Customer creation
    readonly firstName : Locator;
    readonly lasttName : Locator;
    readonly email : Locator;
    readonly telephone : Locator;
    readonly createPassword : Locator;
    readonly confirmPassword : Locator;
    readonly privacyPolicyCheck : Locator;
    readonly continueButton : Locator;
    readonly accountCreated :Locator;

    readonly alreadyUsedError : Locator;


    constructor (page:Page){

        this.page = page;

        this.username = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.warningError = page.getByText('Warning: ');
        this.invalidCredentialError = page.getByText('Warning:');
        this.wishListLink = page.getByRole('link', { name:'Wish List (0)'});

        this.newCustomerHeader = page.getByRole('heading', { name: 'New Customer' });
        this.newCustomerSubText = page.getByText('By creating an account you');
        this.continueLink = page.getByRole('link', { name: 'Continue' });
        

        this.firstName = page.getByRole('textbox', { name: '* First Name' });
        this.lasttName = page.getByRole('textbox', { name: '* Last Name' });
        this.email = page.getByRole('textbox', { name: '* E-Mail' });
        this.telephone = page.getByRole('textbox', { name: '* Telephone' });
        this.createPassword = page.getByRole('textbox', { name: '* Password', exact: true })
        this.confirmPassword = page.getByRole('textbox', { name: '* Password Confirm' })
        this.privacyPolicyCheck = page.getByRole('checkbox');
        this.continueButton = page.getByRole('button', { name: 'Continue' })
        this.accountCreated = page.getByText('Your Account Has Been Created!');

        this.alreadyUsedError = page.getByText(' Warning: E-Mail Address is already registered!');
    }
}