import {Browser, Page, chromium} from "@playwright/test";
import {setDefaultTimeout} from "@cucumber/cucumber"
import { pageFixture } from "./pageFixture";

setDefaultTimeout(60 * 1000 * 2)
let browser: Browser;

//let image: Buffer;
export class Base 
{
    

    async screenshot(imagename: string)
    {
    let image = pageFixture.page.screenshot({ path: 'target/screenshot/'+imagename+Date.now()+'.jpeg', fullPage: true });
    return image;
    }

}