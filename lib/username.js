const child_process = require('child_process')

module.exports = function getUserName() {
    let username
    try {
        username = child_process.execSync('git config --get user.name')
    } catch (error) { }
    username = username && JSON.stringify(username.toString().trim()).slice(1, -1)
    return username
}
