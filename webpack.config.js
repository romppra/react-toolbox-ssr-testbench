require('babel-polyfill');
const path = require('path');
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

const webpackIsomorphicToolsPlugin =
    new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools.config'));

const PATHS = {
    client: path.join(__dirname, 'app/client'),
    common: path.join(__dirname, 'app/common'),
    build: path.join(__dirname, 'build'),
    uiFramework: path.join(__dirname, 'node_modules/react-toolbox'),
};

const config = {
    context: path.join(__dirname),
    devtool: 'eval-source-map',
    entry: {
        app: [
            'webpack-hot-middleware/client?path=http://localhost:9091/static/__webpack_hmr&timeout=20000',
            PATHS.client
        ]
    },
    resolve: {
        alias: {
            app: path.join(__dirname, 'app')
        }
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.app.js',
        publicPath: 'http://localhost:9091/static/',
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "'development'",
                BABEL_EN: "'development'"
            },
        }),
        webpackIsomorphicToolsPlugin.development()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                include: [
                    PATHS.common,
                    PATHS.uiFramework
                ],
                test: /\.css$/,
                loaders: [
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
                    'postcss'
                ]
            },
            {
                test: /\.css$/,
                include: [path.join(__dirname, 'node_modules/normalize.css')],
                loaders: ['style', 'css']
            },
            {
                test: webpackIsomorphicToolsPlugin.regular_expression('images'),
                exclude: /node_modules/,
                loader: 'url-loader?limit=10240',
            },
            {
                test: /\.(eot|svg|ttf|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'url-loader?limit=10240',
                exclude: /node_modules/
            }
        ]
    },
    postcss () {
        return [
            require('postcss-import')({
                root: __dirname,
                path: [
                    path.join(__dirname, 'node_modules/react-toolbox'),
                    path.join(__dirname, './app/common')
                ]
            }),
            require('postcss-mixins')(),
            require('postcss-each')(),
            require('postcss-cssnext')(),
            require('postcss-reporter')({ clearMessages: true })
        ];
    },
};

module.exports = config;
