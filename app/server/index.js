require('babel-register');
require('babel-polyfill');

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
const webpackConfig = require('../../webpack.config.js');
const webpackIsomorphicToolsConfig = require('../../webpack-isomorphic-tools.config.js');

if (!require('piping')({
        hook: true,
        ignore: /(\/\.|~$|\.json|\.css$)/i
    })) {
    return;
}

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
        .server(webpackConfig.context, () => {
        require('./server');
});