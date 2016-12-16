import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import compression from 'compression';
import path from 'path';
import webpackConfig from '../../webpack.config';

import { Root } from 'app/common/spec';

console.info(`Starting react-toolbox-ssr-testbench with NODE_ENV=${process.env.NODE_ENV}, BABEL_ENV=${process.env.BABEL_ENV}`);

const app = new Express();
const PORT = 9090;

app.use(compression());

app.use('/static/', Express.static(path.join(webpackConfig.context, 'build')));

app.use((req, res) => {

    const assets = webpackIsomorphicTools.assets();

    const page = `
        <html>
        <head />
        <body>
        <div id="content">${renderToString(<Root />)}</div>
        <script src=${assets.javascript.app} ></script> 
        </body>
        </html>
    `;

    res.send(page);
});

app.listen(PORT, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.info(`react-toolbox-ssr-testbench listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`);
    }
});
