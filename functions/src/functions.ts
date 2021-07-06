import { configFirebaseEnviroment } from './utils/firebaseUtils'
import express from 'express'

configFirebaseEnviroment()

import { https } from 'firebase-functions';
import gqlServer from './index'

// Graphql api
// https://us-central1-<project-name>.cloudfunctions.net/api/
const api = https.onRequest(async (...args) => {
    try {
        const { app } = await gqlServer();
        return app(...args)
    } catch (error) {
        throw error
    }
});


// Create "main" function to host all other top-level functions
const main = express();
main.use('/api', api);

exports.main = https.onRequest(main);

export {api};