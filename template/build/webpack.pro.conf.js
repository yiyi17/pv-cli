const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path =require('path')
// const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 一个优化'压缩CSS的WebPack插件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    publicPath: '/'
  },
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true,
				sourceMap: false,
				cache: true
			}),
			new OptimizeCSSAssetsPlugin({
				cssProcessorOptions: {
					safe: true,
					map: false
				}
			})
		]
	},
	module: {
		rules: [{
			test: /\.s?css$/,
			use: [
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: false
					}
				},
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: false
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: false
					}
				}
			]
		}]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: path.resolve('index.html'),
			inject: true, // 允许注入打包文件
			minify: {
			  removeComments: true, // 删除注释
			  collapseWhitespace: true, // 折叠空白区域
			  removeAttributeQuotes: true // 尽可能删除属性周围的引号
			},
			chunksSortMode: 'dependency' // 允许控制chunk的排序在插入到HTML之前
		  }),
		new MiniCssExtractPlugin({
			filename: 'static/css/[name]_[hash].css',
			chunkFilename: 'static/css/vendor_[hash].css',
			sourceMap: true
		}),
		 // 复制静态文件
		new CopyWebpackPlugin([
		{
			from: path.resolve(__dirname, '../static'),
			to:'static',
			ignore: ['.*']
    },
    // {
	// 		from: path.resolve(__dirname, '../static/css'),
	// 		to:'static/css',
	// 		ignore: ['.*']
    // }
    //{
			//from: path.resolve(__dirname, '../static/img'),
		//	to:'static/img',
		//	ignore: ['.*']
   // }
		])
	],
	devtool: '#source-map'
})
