"use strict";

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.WEBPACK_ENV;

var libraryName = 'react-moment-datepicker';

var config = {
    output: {},
    plugins: [],
    externals: [],
    module: {
        loaders: [
            {
                "test": /\.jsx?$/,
                "exclude": /node_modules/,
                "loader": "babel"
            },
            {
                "test": /\.json$/,
                "loader": "json"
            }
        ]
    }
};

switch (env) {

    case 'build':
        config.entry = path.resolve('src', 'DatePicker.js');
        config.output.filename = libraryName + '.min.js';
        config.output.path = path.resolve('lib');
        config.output.library = 'ReactMomentDatepicker';
        config.output.libraryTarget = 'umd';
        config.output.umdNamedDefine = true;
        config.externals.push(
            'classnames',
            'moment',
            'moment-timezone',
            'react-addons-css-transition-group',
            'react-popover',
            {
                'react': {
                    root: 'React',
                    commonjs: 'react',
                    commonjs2: 'react'
                },
                'react-dom': {
                    root: 'ReactDOM',
                    commonjs: 'react-dom',
                    commonjs2: 'react-dom'
                }
            }
        );

        config.plugins.push(new ExtractTextPlugin('/_react-moment-datepicker.scss'/*, {allChunks: false}*/));
        config.module.loaders.push({
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style', 'css')
        });

        config.plugins.push(new UglifyJsPlugin({ minimize: true }));

        break;

    default:
        config.entry = path.resolve('examples', 'app.js');
        config.plugins.push(new HtmlWebpackPlugin({
            template: path.resolve('examples', 'index.tpl.html'),
            inject: 'body',
            filename: 'index.html'
        }));
        config.module.loaders.push({
            "test": /\.css?$/,
            "loader": "style!css"
        });
        config.output.filename = libraryName + '.js';
        config.output.path = path.resolve('demo');
        config.output.publicPath = '/';
        config.devtool = 'eval-source-map';
}

module.exports = config;
