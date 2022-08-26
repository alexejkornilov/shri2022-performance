const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");

module.exports = {
    mode: "production",
    entry: './src/scripts.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'docs'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },

        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html"),
        }),
        new MiniCssExtractPlugin({
            linkType: "text/css",
        }),
        new PurgeCSSPlugin({
            paths: glob.sync(`${path.join(__dirname, 'docs')}/**/*`,  { nodir: true }),
        }),
    ],

};