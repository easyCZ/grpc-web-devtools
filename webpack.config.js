const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        devtools: "./src/devtools.ts",
        inject: "./src/inject.ts",
        pageScript: './src/pageScript.ts',
        panel: './src/panel.ts',
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "[name].js"
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'devtools.html',
            template: 'src/devtools.html',
            chunks: ['devtools']
        }),
        new HtmlWebpackPlugin({
            filename: 'panel.html',
            template: 'src/panel.html',
            chunks: ['panel']
        }),
    ]
}