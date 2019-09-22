const puppeteer = require('puppeteer');
const fs = require('fs');

function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeout);
    });
}

/* 업로드 파일이 없을시 생성 */
fs.readdir('pokeJSON', (error) => {
    if(error) {
        console.error('pokeJSON directory is not existed');
        fs.mkdirSync('pokeJSON');
    }
});

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
        */

        /* Get pokemon list from the site */
        const list = await page.evaluate(() => {
                const tr = document.getElementsByClassName('bg-white');
                const arr = [];
                let j = 0;
                for (let i = 0; i < tr.length; i++) {
                    const td = tr[i].getElementsByTagName('td');
                    const type = td[4].innerText
                    //const bookId = parseInt(td[1].innerHTML.substring(2, 5)); // Integer
                    const bookId = td[1].innerHTML.substring(2, 5) // If you wanna get 0 at the head
                    let pokemon;
                    if (type.indexOf('\n') == -1) {
                        pokemon = {
                            id: j++,
                            bookId: bookId,
                            name : td[3].innerHTML,
                            type: type,
                            type_two: null,
                        }
                    } else {
                        pokemon = {
                            id: j++,
                            bookId: bookId,
                            name : td[3].innerHTML,
                            type: type.substring(0, type.indexOf('\n')),
                            type_two: type.substring(type.indexOf('\n') + 1, type.length),
                        }
                    }
                    arr.push(pokemon);
                }
                return arr;
        });
        const obj = {
            list,
        }
        console.log('--------------------------------------------------------line-------------------------------------------');

        console.log(obj);

        /* Make a JSON File to see. -> If it's getting bigger change to database */
        const json = JSON.stringify(obj);
        fs.writeFile('pokeJSON/pokemon-list.json', json, 'utf8', (error) => {
            console.error(error);
        });

        // close a page
        await page.close();
    });
}