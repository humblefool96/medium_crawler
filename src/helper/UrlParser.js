const { URL } = require('url');

// for few url there is no host present in it, so we need to prepend https://medium.com 
// before the url for those cases
const checkHostPresent = url => !(url[0] === '/');

var UrlParser = function (url) {
	const parseUrl = checkHostPresent(url) ? new URL(url) : new URL(url, 'https://medium.com');
	const paramList = {};
	for (const curKey of parseUrl.searchParams.keys()) {
		paramList[curKey] = parseUrl.searchParams.get(curKey);
	}
	UrlParser.prototype.parse = () => {
		return {
			url: parseUrl.href,
			origin: parseUrl.origin,
			host: parseUrl.host,
			hostname: parseUrl.hostname,
			pathname: parseUrl.pathname,
			params: parseUrl.searchParams,
			referenceCount: 1
		};
	}
}

module.exports = {
	UrlParser,
	checkHostPresent
}