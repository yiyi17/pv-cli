module.exports = function downLoadUrl(type) {
    let url
    if (type === 'simple') {
        url = 'https://github.com:yiyibao/vue-simple-project#master'
    } else {
        url = `https://github.com:yiyibao/vue-simple-project#${type}`
    }
    return url
}