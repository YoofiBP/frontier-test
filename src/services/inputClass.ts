import puppeteer from 'puppeteer';
import axios from 'axios';
import fs from "fs";

export class Input {
    protected readonly name:string;
    protected readonly value:string
    protected readonly page:puppeteer.Page;
    protected readonly isDropDown:boolean;

    constructor(name:string, page:puppeteer.Page, value:string) {
        this.name = name;
        this.page = page;
        this.value = value;
        this.isDropDown = this.name === 'location'
    }

    async makeInput() {
        await this.page.waitForSelector(`input[name=${this.name}]`);
        await this.page.type(`input[name=${this.name}]`, this.value);
        if(this.isDropDown){
            //pick from options
            await this.page.waitForSelector('[role="option"]');
            await this.page.waitForFunction('document.querySelector(".sc-bYEvPH").innerText.length !== 0')
            await this.page.click('.sc-bYEvPH');
        }
    }
}

export class FileInput extends Input {
    protected extension:string

    constructor(fileName:string, downloadLink:string, page:puppeteer.Page, extension:string) {
        super(fileName, page, downloadLink);
        this.extension = extension
    }

    async downloadResume() {
        await this.page.waitForSelector('input[type=file]');
        const response = await axios({
            method: 'GET',
            url: this.value,
            responseType: "arraybuffer",
        })
        fs.writeFileSync(`./${this.name}.docx`, response.data);
    }

    async makeInput(){
        await this.downloadResume();
        console.log("Download Complete")
        const elementHandle = await this.page.$("input[type=file]");
        await elementHandle.uploadFile(`./${this.name}.${this.extension}`);
        await this.page.waitForTimeout(1000);
    }
}
