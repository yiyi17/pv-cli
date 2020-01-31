const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    entry:{
        vendor:['vue/dist/vue.esm.js', 'loadsh', 'element-ui', 'vuex', 'vue-router', 'axios']
    },
    output:{
        path: path.join(__dirname,'../static/js'),
        filename: '[name].dll.js',
        library: '[name]_library'
        // // vendor.dll.js中暴露出的全局变量名。
        // 主要是给DllPlugin中的name使用，
        // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
    },
    mode:'production',
    optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true,
				sourceMap: false,
				cache: true
			})
		]
	},
    plugins:[
        new webpack.DllPlugin({
            path:path.join(__dirname,'..','[name]-manifest.json'),
            name:'[name]_library',//name：和output. library保持一致即可。
            context:__dirname//同webpack.config.js中DllReferencePlugin插件的context所指向的上下文保持一致
        })
    ]
}