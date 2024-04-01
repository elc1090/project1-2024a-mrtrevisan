const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapePage(url) {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        
        $('.serra-grid-item.pesquisador').each((index, element) => {
            const item = {};

            item.nome = $(element).find('h3').text().trim();
            item.area = $(element).find('.areas-pesquisador').text().trim();
            item.projeto = $(element).find('.projetos-pesquisador').text().trim();
            item.imagem = $(element).find('.serra-thumb-portfolio img').attr('src');
            item.link = $(element).find('a').attr('href');

            var areas = (item.area).split(' / ');

            areas.forEach(a => { 
                if (!items[a]){
                    items[a] = [];
                }
                
                items[a].push(item);
            });
        }); 

        return;
    } catch (error) {
        console.error('Erro ao fazer scraping da página:', error);
        return;
    }
}

var start = new Date();
const items = {};

process.on('exit', function() {
    endTime = new Date();
    var elapsed = endTime - start; //in ms
    // strip the ms
    elapsed /= 1000;
    console.log(`Done scrapping. Took ${elapsed} seconds`);
});

async function main(){
    const base_url = 'https://serrapilheira.org/pesquisadores/';

    for (let pag = 1; pag <= 13; pag++) {
        const url = `${base_url}?sf_paged=${pag}`;
        await scrapePage(url)
        // items = items.concat();
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    json = JSON.stringify(items, null, 2);
    
    fs.writeFileSync('../data.json', json, { flag: 'w+' });
}

main();