let axios = require('axios');
let cheerio = require('cheerio');
// let fs = require('fs');

var scrapeWeb = (url) => axios.get(url)
    .then((response) => {
        if (response.status === 200) {
            let urlFound = [];
            const html = response.data;
            const $ = cheerio.load(html);
            // fs.writeFile('./data/medium.txt', html, (err) => {
            //     console.log(err);
            // })
            $('a').each((index, link) => {
                urlFound.push(($(link).attr('href')));
            });
            return urlFound;
        }
    }, (error) => {
        console.log(error);
    });

// test code
// scrapeWeb('https://medium.com/')
//     .then(res => {
// console.log(res);
//     })
module.exports = scrapeWeb;