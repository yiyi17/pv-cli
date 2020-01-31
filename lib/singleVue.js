const fs = require('fs')
const shelljs = require('shelljs/global')
const path = require('path')

module.exports = async(name) => {

    const filePath = path.join(process.env.PWD, name)
    // console.log(process.env.HOME)
    const templateDir = path.join(process.env.HOME, 'pv-cli/template')
    // console.log(templateDir);
    // 启动命名就执行 文件下的run dev
    
    const templatePath = path.join(templateDir, 'src/App.vue')
    try {
        //热更新
        const content =
            `
                <template>
                    <div>
                        <Test></Test>
                    </div>
                </template>
                <script>
                import Test from '${filePath}'
                export default {
                    components:{
                        Test
                    }
                }
                </script>
                `
        await fs.writeFileSync(templatePath, content)
        //执行npm run dev 命令
        cd(templateDir)
        if (exec('npm run dev').code !== 0) {
            exit(1);
        }
    } catch (error) {
        console.error(error)
    }
}
