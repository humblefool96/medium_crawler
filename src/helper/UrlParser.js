const { parse } = require('path');
const { URL } = require('url');

// for few url there is no host present in it, so we need to prepend https://medium.com 
// before the url for those cases

const checkHostPresent = url => {
	return url[0] === '/' ? false : true;
}

var UrlParser = function (url) {
	const parseUrl = checkHostPresent(url) ? new URL(url) : new URL(url, 'https://medium.com');
	return {
		origin: parseUrl.origin,
		host: parseUrl.host,
		hostname: parseUrl.hostname,
		pathname: parseUrl.pathname,
		params: parseUrl.searchParams
	};
}

module.exports = {
	UrlParser,
	checkHostPresent
}