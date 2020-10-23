const URL = require('url');

// for few url there is no host present in it, so we need to prepend https://medium.com 
// before the url for those cases
var UrlParser = function (url) {
	const parseUrl = URL.parse(url);
	console.log(parseUrl);
	return parseUrl;
}

module.exports = UrlParser;