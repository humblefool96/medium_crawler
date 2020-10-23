const AsyncQueue = require('../helper/AsyncQueue');
const scrapeWeb = require('../api/api');
const { UrlParser, checkHostPresent } = require('../helper/UrlParser');
const patternHelper = require('../helper/PatternHelper');
const saveAndUpateDb = require('../db/saveAndUpdateDb');

const processedUrl = new Set();
const processedUrlTillPath = new Map();

const MEDIUM_SITE = 'https://medium.com';

const taskList = [
	MEDIUM_SITE
];
const queue = new AsyncQueue(taskList, 5);

const getUrlComponents = (url) => {
	return new UrlParser(url).parse();
};

const checkValid = function (url) {
	return patternHelper.checkMediumUrl(url)
		&& patternHelper.checkValidUrl(url)
		&& patternHelper.checkNotSignInPage(url);
};

const promise = (curUrl) => new Promise((resolve, reject) => {
	scrapeWeb(curUrl)
		.then((urlList) => {
			if (urlList) {
				console.log('processing url : ' + curUrl);
			processedUrl.add(curUrl); // add current url to processed list
			for (let url of urlList) {
				// if host is absent, the it belongs to medium, so add medium website before url
				if (url && !checkHostPresent(url)) {
					url = MEDIUM_SITE + url;
				}
				// check if the url is valid and it has not been processed yet
				if (checkValid(url) && !processedUrl.has(url)) {
					queue.addTask(url);
				}
			}
			const curUrlParsed = getUrlComponents(curUrl);
			const curUrlTillPath = curUrlParsed.origin + curUrlParsed.pathname;

			if (processedUrlTillPath.has(curUrlTillPath)) {
				processedUrlTillPath[curUrlTillPath].referenceCount++;
				for (let [key, value] of curUrlParsed.params) {
					if (!processedUrlTillPath[curUrlTillPath].params.has(key)) {
						processedUrlTillPath[curUrlTillPath].params[key] = value;
					}
				}
			} else {
				processedUrlTillPath[curUrlTillPath] = curUrlParsed;
			}
			saveAndUpateDb(processedUrlTillPath[curUrlTillPath]);
			resolve('Done processing: ' + curUrl);
			}
		})
});

var UrlScraperEngine = function () {
	queue.run(promise);
}

// UrlScraperEngine();

module.exports = UrlScraperEngine;