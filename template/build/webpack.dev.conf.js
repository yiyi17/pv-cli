const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const interfaces = require('os').networkInterfaces();
const portfinder = require('portfinder')

let host = '0.0.0.0'

for(let devName in interfaces){  
  const iface = interfaces[devName];  
  for(let i=0;i<iface.length;i++){  
     const alias = iface[i];  
     if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){  
          host = alias.address;  
     }  
  }  
}


const devConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: [{
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
    ]
  },
  devtool: '#source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
})

module.exports = () =>{
	return new Promise((resolve,reject) => {
		portfinder.basePort = 8080
    portfinder.getPort((err, port) => {
      if (err) return reject(err)
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`您的项目运行在 http://localhost:${port}`],
            notes: [`您也可以查看您的 电脑ip + 端口号 ( http://${host}:${port} ) 来访问！`]
          },
          clearConsole: true,
          onErrors: (severity, errors) => {
          }
        })
      )
      resolve({devConfig, port})
    })
	})
} 