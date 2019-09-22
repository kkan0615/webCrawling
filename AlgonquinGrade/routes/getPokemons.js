const fs = require('fs');

/* 업로드 파일이 없을시 생성 */
fs.readdir('pokeJSON', (error) => {
    if(error) {
        console.error('pokeJSON directory is not existed');
        fs.mkdirSync('pokeJSON');
    }
});

module.exports = async() => {
    let obj = null;
    fs.readFile('pokeJSON/pokemon-list.json', 'utf8', (error, data) => {
        if (error) {
            console.error(error);
            return null;
        } else {
            obj = JSON.parse(data);
        }
        console.log(obj);

        return obj
    });
}