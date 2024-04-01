const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

async function scrapePage(url) {
    try {
        //requisition to the url
        const response = await axios.get(url);
        //get the html
        const $ = cheerio.load(response.data);
        
        //get the researcher cards
        $('.serra-grid-item.pesquisador').each((index, element) => {
            const item = {};

            //relevant data
            item.nome = $(element).find('h3').text().trim();
            item.area = $(element).find('.areas-pesquisador').text().trim();
            item.projeto = $(element).find('.projetos-pesquisador').text().trim();
            item.imagem = $(element).find('.serra-thumb-portfolio img').attr('src');
            item.link = $(element).find('a').attr('href');

            var areas = (item.area).split(' / ');

            //order by area on JSON object
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

//register the start date
var start = new Date();
//initialize a global object of items
const items = {};

//on exit, display the elapsed time in seconds
process.on('exit', function() {
    endTime = new Date();
    var elapsed = endTime - start; //in ms
    elapsed /= 1000; //in seconds
    console.log(`Done scrapping. Took ${elapsed} seconds`);
});

async function main(){
    const base_url = 'https://serrapilheira.org/pesquisadores/';

    for (let pag = 1; pag <= 13; pag++) {
        //there are 13 pages
        const url = `${base_url}?sf_paged=${pag}`;
        //scrap the page
        await scrapePage(url)
        // wait a while, so the API does not overload
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    //save the scrapped data
    json = JSON.stringify(items, null, 2);
    fs.writeFileSync('../data.json', json, { flag: 'w+' });
}

main();