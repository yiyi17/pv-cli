#! /usr/bin/env node

const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')
const download = require('download-git-repo')
const Handlebars = require('handlebars')
const ora = require('ora')
const chalk = require('chalk')
const symbols = require('log-symbols')
const child_process = require('child_process')
const packageFile = require('../package.json')
const shelljs = require('shelljs/global');

function execCmd(cmd) {
    return child_process.execSync(cmd).toString().trim()
}
program.version(packageFile.version, '-v,--version') //获取版本
    .command('init <name> <type>') //创建项目名
    .action((name, type) => {
        if (!fs.existsSync(name)) { //判断项目名是否存在
            let username
            try {
                username = child_process.execSync('git config --get user.name')
            } catch (error) {}
            username = username && JSON.stringify(username.toString().trim()).slice(1, -1)
            inquirer.prompt([{ //问题
                    type: 'input',
                    boolean: 'confirm',
                    name: 'author',
                    default: username || '',
                    message: '请输入作者名称'

                },
                {
                    type: 'input',
                    boolean: 'confirm',
                    name: 'description',
                    default: 'A Vue.js project',
                    message: '请输入描述信息'
                },
                {
                    type: 'list',
                    boolean: 'confirm',
                    name: 'build',
                    message: '请选择安装依赖方式',
                    choices: [{
                        name: 'npm install',
                        value: 1,
                        short: 'npm install'
                    }, {
                        name: 'cnpm install',
                        value: 2,
                        short: 'cnpm install'
                    },{
                        name: '我自己安装',
                        value: 0,
                        short: '我自己安装'
                    }]
                }
            ]).then((answers) => { //回答问题之后
                const spinner = ora('正在下载模版...') //ora 来提示用户正在下载中
                spinner.start()
                let url
                if (type === 'simple') {
                    url = 'https://github.com:yiyibao/vue-simple-project#master'
                } else {
                    url = `https://github.com:yiyibao/vue-simple-project#${type}`
                }
                download(url, name, (err) => {
                    if (err) { //下载失败
                        spinner.fail()
                        console.log(symbols.error, chalk.red(err))
                    } else { //下载成功
                        spinner.succeed()
                        const fileName = `${name}/package.json` //写入下载的package.json文件
                        const meta = {
                            name,
                            description: answers.description,
                            author: answers.author
                        }
                        if (fs.existsSync(fileName)) {
                            const content = fs.readFileSync(fileName).toString()
                            const result = Handlebars.compile(content)(meta)
                            fs.writeFileSync(fileName, result)
                        }
                        const description = `
=======================================================================
        start:
        ----------------------
        cd ${name}    
        npm install  
        npm run dev 
        ----------------------
=======================================================================
`
                        console.log(symbols.success, chalk.green('项目下载完成'))
                        if (answers.build) {
                            let cmd = 'npm install'
                            if(answers.build === 2){
                                cmd = 'cnpm install'
                            }
                            const tip = ora(`${cmd} ...`)
                            tip.start()
                            cd(`./${name}`)
                            execCmd(cmd);
                            tip.succeed()
                            console.log(symbols.success, chalk.green('项目初始化完成'))
                        } else if(type!=='module'&&ype!=='Integrate') {
                            console.log(description)
                        }

                    }
                })
            })
        } else {
            console.log(symbols.error, chalk.red('项目已存在'))
        }
    })




program.parse(process.argv)