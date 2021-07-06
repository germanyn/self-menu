// @ts-check
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * @param {any} app
 */
module.exports = function (app) {
    app.use(
        '/api/graphql',
        createProxyMiddleware({
            target: 'http://localhost:5000/self-menu/us-central1/api/graphql',
            secure: false,
            changeOrigin: true,
        })
    );
};