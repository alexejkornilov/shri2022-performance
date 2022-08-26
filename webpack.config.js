const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");

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
            {
                test: /\.(jpe?g|gif|svg)$/i,
                type: "asset",
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
    optimization: {
        minimizer: [
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you
                        plugins: [
                            ["gifsicle", {interlaced: true}],
                            ["mozjpeg", {progressive: true}],
                            // Svgo configuration here https://github.com/svg/svgo#configuration
                            [
                                "svgo",
                                {

                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    }
};