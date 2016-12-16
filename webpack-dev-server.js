import Express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

const app = new Express();
const port = 9091;

const compiler = webpack(webpackConfig);

if(module.hot) {
    module.hot.accept();
}

app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    noInfo: true,
    inline: true,
    lazy: false,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log,
    path: '/static/__webpack_hmr',
    heartbeat: 10 * 1000,
}));

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`Dev-server Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
}
});