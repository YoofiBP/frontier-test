import puppeteer from 'puppeteer'
import {FileInput, Input} from "./inputClass";
import {
    APPLY_NOW_CLASS,
    FRONTIER_APPLICATION_URL,
    NEXT_BUTTON_CLASS,
    REVIEW_AND_SEND_BUTTON_CLASS, SEND_BUTTON_CLASS
} from "../config/constants";
import {iApplicationModel} from "../models/ApplicationModel";

export const submitToFrontier = async (formData:iApplicationModel) => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 100 });
    const page = await browser.newPage();

    //Goto application link
    await page.goto(FRONTIER_APPLICATION_URL);

    //wait for Apply button to appear and click
    await page.waitForSelector(APPLY_NOW_CLASS);
    await page.click(APPLY_NOW_CLASS)

    //make input for each input category
    const {resume, ...props} = formData;

    //handle input of all fields except resume
    for (const prop of Object.keys(props)) {
        const input = new Input(prop, page, props[prop]);
        await input.makeInput()
    }

    //deal with resume input
    // await clickByText(page, "Next");
    await page.click(NEXT_BUTTON_CLASS)
    const fileInput = new FileInput("resume",resume,page,'docx');
    await fileInput.makeInput();

    //Review and Send Form
    await page.waitForSelector(REVIEW_AND_SEND_BUTTON_CLASS)
    await page.click(REVIEW_AND_SEND_BUTTON_CLASS)
    await page.waitForSelector(SEND_BUTTON_CLASS)
    await page.click(SEND_BUTTON_CLASS)
}

export default submitToFrontier;