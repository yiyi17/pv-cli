const webpack = require('webpack')
const devConfigPromise = require('./webpack.dev.conf.js')
const webpackDevServer = require('webpack-dev-server')
const url = require('url')
const path = require('path')
let host = '0.0.0.0'; 

devConfigPromise().then(({ devConfig, port}) => {
    const compiler = webpack(devConfig)
    const server = new webpackDevServer(compiler, {
        // proxy,
        // contentBase: path.join(__dirname,'../'),
        hot: true,
        clientLogLevel: 'none',
        overlay: {
            warnings: true,
            errors: true,
        },
        disableHostCheck: true,
        quiet: true,
        progress: false,
        historyApiFallback: {
            index: url.parse('/assets/').pathname
        },
        stats: {
            colors: true
        },
    })

    server.listen(port, host)
}).catch(err => console.log(err))
