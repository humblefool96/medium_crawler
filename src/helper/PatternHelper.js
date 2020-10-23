const mediumPattern = new RegExp('medium.com');
const validUrl = new RegExp('^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,})' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$', 'i');

const checkValidUrl = (url) => {
    return validUrl.test(url);
}

const checkMediumUrl = (url) => {
    return mediumPattern.test(url);
}

module.exports = { checkMediumUrl, checkValidUrl };