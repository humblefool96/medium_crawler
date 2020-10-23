const assert = require('assert');
const UrlParser = require('../src/helper/UrlParser');

describe('Url Parse Test', () => {
	it('should return correct hostname', () => {
		const parseurl = UrlParser('https://medium.com/about/me?name=anil&age=24');
		assert.strictEqual(parseurl.hostname, 'medium.com');
	})
})