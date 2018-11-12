const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const vendors = [
    'react',
    'react-dom'
]

module.exports = (env, options) => {
    const devMode = options.mode !== 'production'
    return {
        mode: options.mode,
        entry: {
            bundle: path.join(__dirname, 'src', 'index.js'),
            vendor: vendors
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    loader: 'file-loader',
                    test: /\.(png|gif|jpg|svg|ico|woff|woff2|eot|ttf)$/i
                }
            ]
        },
        devServer: {
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({ template: path.join(__dirname, 'public', 'index.html') }),
            new MiniCssExtractPlugin({
                filename: devMode ? '[name].css' : '[name].[hash].css',
                chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
            }),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                jquery: 'jquery',
                'window.$': 'jquery',
                'window.jQuery': 'jquery'
            })
        ],
        optimization: {
            splitChunks: {
                chunks: 'all'
            },
            runtimeChunk: true
        }
    }
}
