const shelljs = require('shelljs/global')
// 将 templateDir移动到 ~/pv-cli/
// 然后进行安装
exec(`mkdir ${ process.env.HOME}/pv-cli`)
exec(`cp -r ./template ${process.env.HOME}/pv-cli`)
cd(`${process.env.HOME}/pv-cli/template`)
exec(`npm install`)