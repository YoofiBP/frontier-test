import puppeteer from 'puppeteer'

export const puppetTest = async () => {
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
                linkedin: "LinkedIN",
                resume: "resume"
            }),
            headers: { "Content-Type": "application/json" },
        });
    });
    await page.goto('http://localhost:5000/application');

    await browser.close();
};