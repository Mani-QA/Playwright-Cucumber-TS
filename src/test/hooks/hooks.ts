import {Before,BeforeAll, AfterAll, After} from "@cucumber/cucumber";
import {chromium, Browser, Page, BrowserContext} from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { Base } from "./baseClass" ;

let page:Page;
let browser: Browser;
let base: Base
let img: Buffer;
base=new Base();

BeforeAll(async function()
{
    browser = await  chromium.launch({headless:false});
    //const context = await browser.newContext({ storageState: '/.auth/admin.json' });
   // page = await context.newPage();
    page = await browser.newPage();
    pageFixture.page=page;
    
    
});



AfterAll(async function()
{
   await pageFixture.page.close();
   await browser.close();
});

Before(async function({pickle})
{
    console.log(" Scenario: "+pickle.name);
});

After(async function({pickle, result})
{
    let SITEURL = process.env.npm_config_SITE;
    
    if (SITEURL === undefined)
    {
        SITEURL = "https://www.saucedemo.com/";
    }
   
    
    if (result?.status == "FAILED") 
    {
        console.log("Scenario Failed");
        console.log(pageFixture.page.url());
        
       
        img = await base.screenshot("Failure-"+pickle.name);
        await this.attach(
            img, "image/jpeg"
        );

        await pageFixture.page.goto(SITEURL);
    }
    else {
        console.log("Scenario Success");
        img = await base.screenshot("Success-"+pickle.name);
        await this.attach(
            img, "image/jpeg"
        );
    }

    
});
