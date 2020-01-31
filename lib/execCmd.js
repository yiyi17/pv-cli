const child_process = require('child_process')

module.exports = function execCmd(cmd) {
    return child_process.execSync(cmd).toString().trim()
}