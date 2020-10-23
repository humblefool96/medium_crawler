const UrlSchema = require('../schema/mongoUrlModel');

const getUrls = async function(req, res) {
    let urlsFound = await UrlSchema.find({});
    if (urlsFound) {
        res.send({
            urlsFound: urlsFound,
            success: true
        })
    }
}

module.exports = { getUrls };