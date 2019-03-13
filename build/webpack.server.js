const path = require('path')
const nodeExternals = require('webpack-node-externals') // node编译环境下   保证 express 类 不会被打包
const merge = require('webpack-merge');
const _config = require('./webpack.base.js');
const clientConfig = {
    target: 'node',// node 编译环境
    entry: path.resolve(__dirname, '../src/server/index.js'), // 入口文件
    externals: [nodeExternals()],
    mode: 'development',// production or development 一般是 控制台输入的 比如 webpack --mode=production 通常是不需要写的
    output: {
        path: path.resolve(__dirname, '../dist'), //输出路径
        filename: "bundle.server.js",
        publicPath:'http://127.0.0.1/public/'
    },
    module: {
        rules: [{
            test: /\.(css|styl)$/,
            use: [
                'isomorphic-style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    },                  
                }, 'postcss-loader','stylus-loader'
            ]
        },]
    }
}
//
module.exports = merge(clientConfig, _config);