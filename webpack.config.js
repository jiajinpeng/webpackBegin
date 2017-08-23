const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve}=require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const srcDir = resolve(__dirname,'src');
const distDir = resolve(__dirname,'dist')


module.exports={
    entry: {
        app: `${srcDir}/app.js`,
        contact: `${srcDir}/contact.js`
    },
    output:{
        path: `${distDir}`,
        filename:'[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: ["css-loader","sass-loader"],
                    publicPath: '/dist'
                })
            },
            {
                test: /\.js$/,
                exclude: __dirname + '/node_modules/',
                use: 'babel-loader' 
            }
        ]
    },
    devServer: {
        contentBase: __dirname + "/dist",
        compress: true,
        port: 9000,
        // open: true,
        stats: "errors-only"
    },
    plugins:[
        // new ExtractTextPlugin("app.css"),
        new ExtractTextPlugin({
            filename: "app.css",
            disabled: false,
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            title: 'project jjp',
            minify: {
                collapeWhitespace: true
            },
            // filename: './../index.html',
            hash: true,
            excludeChunks: ['contact'],
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        new HtmlWebpackPlugin({
            title: 'contact page',
            filename: 'contact.html',
            hash: true,
            chunks: ['contact'],
            template: './src/contact.html'
        })
    ]
}﻿