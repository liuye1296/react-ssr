const path = require('path')
const merge = require('webpack-merge');
const _config = require('./webpack.base.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //压缩css文件 单独打包css
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const Jsuglify = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');//动态创建html 插件
const clientConfig = {
    entry: path.resolve(__dirname, '../src/client/index.js'), // 入口文件
    mode: 'development',// production or development 一般是 控制台输入的 比如 webpack --mode=production 通常是不需要写的
    output: {
        path: path.resolve(__dirname, '../public'), //输出路径
        filename: "[name]_[hash:6].js",
        publicPath: 'http://127.0.0.1/public/'//输入文件的绝对路径 配合 生产环境 CDN  之类  通常静态文件都是放置CDN的
    },
    optimization: {//分割文件配置
        splitChunks: {
            chunks: "all",
            minSize: 1,//要生成的块的最小大小。
            minChunks: 1,//分割前必须共享模块的最小块数。
            maxAsyncRequests: 5,//按需加载时的最大并行请求数。
            maxInitialRequests: 3,//按需加载时的最大并行请求数。
            name: true,
            // cacheGroups: {
            //     styles: {
            //         name: 'styles',
            //         test: /\.css$/,
            //         chunks: 'all',
            //         enforce: true
            //     }
            // }
        },
        minimizer: [
            new OptimizeCssAssetsPlugin({}),
            new Jsuglify()
        ]
    },
    module: {
        rules: [{
            test: /\.(css|styl)$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true,
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    }
                },
                'postcss-loader',
                'stylus-loader'
            ]
        },]
    },
    plugins: [
        new MiniCssExtractPlugin({
            chunkFilename: "css/[name].[contenthash].css",
            filename: "css/style.[contenthash].css",
        }),
        new HtmlWebpackPlugin({
            template: './static/index.server.html', // 添加模版文件
            filename: 'index.server.html',
            favicon: './static/favicon.ico',
            showErrors: false
        })
    ]

}

module.exports = merge(clientConfig, _config);