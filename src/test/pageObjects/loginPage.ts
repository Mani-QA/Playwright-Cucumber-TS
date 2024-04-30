import {Browser, BrowserContext, Page, chromium, expect} from "@playwright/test";
import {setDefaultTimeout} from "@cucumber/cucumber"
import { pageFixture } from "../hooks/pageFixture";

setDefaultTimeout(60*1000*2)

let browser: Browser;
//let page:Page;

export class Login {
    private page: Page;
    
    constructor(page: Page)
    {
        this.page=page;
    }

    private Elements = {
        txtUserInput: 'id=user-name',
        txtPasswordInput: 'id=password',
        btnSubmit: 'id=login-button',
        lblError: "//h3[@data-test='error']",
        lblHomepage: '.title'
        }

    async enterUserName(username: string) {
        await this.page.waitForLoadState();
        await this.page.locator(this.Elements.txtUserInput).fill(username);
    }

    async enterPassword(password: string) {
        await this.page.locator(this.Elements.txtPasswordInput).fill(password);
    }

    async clickLoginButton() {
        await this.page.click(this.Elements.btnSubmit);
        await this.page.waitForLoadState();
    }

    async verifyError(error: string) {
        await expect(this.page.locator(this.Elements.lblError)).toHaveText(error);
    }

    async verifyHomepage() {
        await expect(this.page.locator(this.Elements.lblHomepage)).toHaveText("Products");
    }
}