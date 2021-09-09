// @ts-check
const { createProxyMiddleware } = require('http-proxy-middleware');

/**
 * @param {import('express').Application} app
 */
module.exports = function (app) {
    app.use(
        '/api/graphql',
        createProxyMiddleware({
            target: '',
            router: req => {
                return {
                    host: req.hostname,
                    port: 4000,
                    path: '/self-menu/us-central1/api/graphql',
                }
            }
        })
    );
};