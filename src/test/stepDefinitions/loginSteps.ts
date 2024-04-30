
import{Given,Then,When,setDefaultTimeout} from "@cucumber/cucumber"
import {expect} from "@playwright/test";
import { pageFixture } from "../hooks/pageFixture";
import { Login }  from '../pageObjects/loginPage';


let login: Login;
let SITEURL = process.env.npm_config_SITE;
    
if (SITEURL === undefined)
{
    SITEURL = "https://www.saucedemo.com/";
}

       
    Given('User Navigates to the application', async function () {
        await pageFixture.page.goto(SITEURL);
        
    });
           
    Given('User enter the username as {string}', async function (username) {
        login = new Login(pageFixture.page);
        await login.enterUserName(username); 
    });
       
    Given('User enter the password as {string}', async function (password) {
        await login.enterPassword(password);
    });

    Then('User clicks on the Login button', async function () {
        await login.clickLoginButton();
        
    });

    Then('Login should be success', async function () {
        await login.verifyHomepage();
        
    });

    Then('Login should fail', async function () {
       await login.verifyError("Epic sadface: Sorry, this user has been locked out.")
    });