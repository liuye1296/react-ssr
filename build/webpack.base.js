//公共配置文件
module.exports = {
    module: {
        rules: [{
            test: /\.(js|jsx)$/, // 匹配
            loader: 'babel-loader', // 使用 babel-loader 处理 这些文件
            exclude: /node_modules/, // node_modules下 不处理
        },
        {// img 压缩，，生成hash值
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,//小于 8192 就转换
                        name: '[name][hash:5].[ext]',
                        outputPath: 'img/',//输出路径
                        fallback: 'file-loader'//失败之后处理方式
                    }
                },
            ]
        }]
    }
}