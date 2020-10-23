const UrlModel = require('../schema/mongoUrlModel');

// Database update
var saveAndUpdateDb = async urlModel => {
    console.log('started db operation');
    let isPresentInDb = await UrlModel.findOne({ url: urlModel.url });
    if (!isPresentInDb) {
        let newEntry = new UrlModel({
            url: urlModel.url,
            referenceCount: 1,
            parameters: urlModel.params ? Array.from(urlModel.params, ([key, value]) => ({ key, value })) : []
        })
        await newEntry.save();
    } else {
        isPresentInDb.url = urlModel.url;
        isPresentInDb.referenceCount = urlModel.referenceCount;
        isPresentInDb.parameters = urlModel.params ? Array.from(urlModel.params, ([key, value]) => ({ key, value })) : [];
        new UrlModel(isPresentInDb);
        await isPresentInDb.save();
    }
}

module.exports = saveAndUpdateDb;
