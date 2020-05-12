const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
require('dotenv').config();


module.exports = {
    mode:'development',
    entry: './src/client/index.js',
    devServer: {
        port: process.env.DEVSERVER_PORT,
        proxy: [
            {
                context: ["/save", "/forecast"],
                target: `http://localhost:${process.env.DEVSERVER_PORT}`
            }
        ]
    },
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use:[
                    {
                        loader: 'file-loader',
                    }
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "index.html",
        }),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
}