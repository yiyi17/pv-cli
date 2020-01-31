const fs = require('fs')
const shelljs = require('shelljs/global')
const path = require('path')

module.exports = async(name) => {
    const filePath = path.join(process.env.PWD, name)
    const templateDir = path.join(__dirname, '../template')
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
