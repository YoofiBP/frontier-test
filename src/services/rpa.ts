import puppeteer from 'puppeteer'
import qs from 'qs';

export const submitDataWithPuppet = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Puppeteer running")
    await page.setRequestInterception(true);

    page.on("request", interceptedRequest => {
        interceptedRequest.continue({
            method: "POST",
            postData: JSON.stringify({
                firstname: "test",
                lastname: "test",
                phone: "1234567",
                location: "Accra",
                email: "email@example.com",
                linkedin: "LinkedIn",
                resume: "resume"
            }),
             headers: { "Content-Type": "application/json" }
        });
    });
    await page.goto('http://localhost:5000/application/');


    await browser.close();
};