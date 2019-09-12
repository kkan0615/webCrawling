const puppeteer = require('puppeteer');

function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

module.exports = async() => {
    puppeteer.launch({
        headless: false,
        devtools: true,
    }).then(async browser => {
        const page = await browser.newPage();
        await page.goto("https://pokemon.fandom.com/ko/wiki/%EC%A0%84%EA%B5%AD%EB%8F%84%EA%B0%90", { waitUntil: "networkidle2" });
        /*const list = await page.waitFor("body.mediawiki > div.WikiaSiteWrapper > section#WikiPage > div.WikiaPageContentWrapper >"
         + "article#WikiaMainContent > div#WikiaMainContentContainer > div#WikiaArticle > div#mw-content-text > table");
         const txtList = await page.evaluate(list => list.textContent, list);
        //await page.screenshot({path: 'test.png'});
        console.log('--------------------------------------------------------line-------------------------------------------');

        console.log(txtList);
        */
       let result;
       await page.evaluate(() => {
            result = document.getElementById("mw-content-text").getElementsByTagName("tr");
       });
       console.log(result);

    });
}