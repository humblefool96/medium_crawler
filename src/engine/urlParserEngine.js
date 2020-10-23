const UrlSchema = require('../schema/mongoUrlModel');
const AsyncQueue = require('../helper/AsyncQueue');
const scrapeWeb = require('../api/api');

const taskList = [
	'https://medium.com'
];

const getDomainAndPath = (url) => {
	
}

const promise = (url) => new Promise((resolve, reject) => {
	scrapeWeb(url)
		.then((urlList) => {
			console.log(urlList);
		})
})

var UrlScraperEngine = function () {
	const queue = new AsyncQueue(taskList, 5);
	queue.run(promise);
}

UrlScraperEngine();

module.exports = UrlScraperEngine;