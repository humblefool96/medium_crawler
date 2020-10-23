const assert = require('assert');
const { UrlParser, checkHostPresent } = require('../src/helper/UrlParser');

describe('Url Parse Test', () => {
	it('should return correct hostname', () => {
		const parseurl = UrlParser('https://medium.com/about/me?name=anil&age=24');
		assert.strictEqual(parseurl.hostname, 'medium.com');
	});
	it('should return medium hostname for null host', () => {
		const parseUrl = UrlParser('/about/me?name=anil&age=24');
		assert.strictEqual(parseUrl.hostname, 'medium.com');
	})
});

describe('Hostname Present Check', () => {
	it('should return true for no hostname in url', () => {
		assert.strictEqual(checkHostPresent('/about/me?name=anil&age=24'), false);
	})
})