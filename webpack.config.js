const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        app: path.resolve(__dirname,'src','app.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist','src'),
        filename: './[name].bundle.[contenthash].js',
    },
    mode: "none",
    module: {
        rules: [{
            test: /\.s[ac]ss$/i,
            use: [
              MiniCssExtractPlugin.loader,
              "css-loader",
              "sass-loader",
            ]
        }],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:`../styles/style.css`
        }),
        new HtmlWebpackPlugin({
            filename:"../index.html",
            template:"./index.html"
        })
    ],
    optimization: {
        minimizer: [
          new CssMinimizerPlugin(),
        ]
    }


}