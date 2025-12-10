// @ts-check

import { Page, expect, BrowserContext, request } from "@playwright/test";
import apiLoginData from '../../testData/apiLoginData.json'  with { type: 'json'};

export class loginPage {

    async loginUsingAPIRequest(): Promise<string> {
        const loginPayload = {
            userEmail: apiLoginData.userEmail,
            userPassword: apiLoginData.userPassword
        };

        const apiContext = await request.newContext();

        const loginResponse = await apiContext.post(
            process.env.BASE_URL + "auth/login",
            { data: loginPayload }
        );

        console.log('log1 :', loginResponse.status());
        expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();
        console.log('log2 :', loginResponseJson);

        const token = loginResponseJson.token;
        console.log('log3 :', token);

        await apiContext.dispose(); // cleanup resources

        return token; // 📌 returning token to caller
    }

}