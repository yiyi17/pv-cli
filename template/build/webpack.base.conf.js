const {
	resolve
} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const publicPath = '/'

module.exports = {
	entry: {
		index: './src/main.js',
		// vendor: './src/vendor'
	},
	output: {
		path: resolve(__dirname, '../dist'),
		filename: 'static/js/[name][hash].js',
		chunkFilename: 'static/js/[id][chunkhash].js?',
		publicPath: publicPath
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				exclude: /node_modules/,
				options: {
					loaders: {
						scss: 'vue-style-loader!css-loader!sass-loader',
						sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
					}
				}
			},
			{
				test: /\.js$/,
				use: [
					'babel-loader'
				],
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						root: resolve(__dirname, 'src'),
						attrs: ['img:src', 'link:href']
					}
				}]
			},
			// {
			// 	test: /\.(js|vue)$/,
			// 	loader: 'eslint-loader',
			// 	enforce: 'pre',
			// 	include: [resolve('src'), resolve('test')],
			// 	exclude: /node_modules/,
			// 	options: {
			// 		formatter: require('eslint-friendly-formatter'),
			// 		//不符合Eslint规则时只警告(默认运行出错)
			// 		emitWarning: true
			// 	}
			// },
			{
				test: /favicon\.png$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]?[hash]'
					}
				}]
			},
			{
				test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
				exclude: /favicon\.png$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10,
						name: 'static/img/[name].[ext]?[hash]'
					}
				}]
			}
		]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require(resolve(__dirname,'../vendor-manifest.json'))
		}),
		new webpack.optimize.SplitChunksPlugin({
			chunks: "all",
			minSize: 3000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'index.html',
			inject: true
		}),
		new VueLoaderPlugin()
	],
	externals: { // 抽离第三方库
		// "vue":"window.Vue",
		// "vue-router":"window.VueRouter",
		// "vuex":"window.Vuex",
		// "axios":"window.axios",
		// "_":"window._",
		// "Element":"window.Element"
	},
	resolve: {
		alias: {
			'~': resolve(__dirname, '../src/components')
		}
	}

}
