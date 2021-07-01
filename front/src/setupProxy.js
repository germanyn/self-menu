// @ts-check
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * @param {any} app
 */
module.exports = function (app) {
    app.use(
        '/graphql',
        createProxyMiddleware({
            target: 'http://[::1]:4000/graphql',
            secure: false,
            changeOrigin: true,
        })
    );
};