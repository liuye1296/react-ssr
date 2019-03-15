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
                //webpack 是从下向上执行 所以是 先解析stylus 
                //然后添加 浏览器兼容postcss 在 CSS文件引入到对应的入口文件里(css-loader)
                //最后创造一个style标签，将引入的css放置进去(style-loader or isomorphic-style-loader)
                'isomorphic-style-loader', {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                }, 'postcss-loader', 'stylus-loader'
            ]
        },]
    },
}
//
module.exports = merge(clientConfig, _config);