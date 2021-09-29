import { ApolloServer } from "apollo-server-express"
import { Express } from 'express'
import schema from "../schema"
import { SECRET, TokenPayload } from "./autenticacao"
import jwt = require('express-jwt')
import express = require('express')

export async function setupServer(): Promise<[ApolloServer, Express]> {

    const app = express()

    const path = "/graphql"
  
    app.get('/', (req, res) => {
      res.send('health OK')
    })
  
    app.use(
      jwt({
        secret: SECRET,
        credentialsRequired: false,
        algorithms: ['HS256'],
      }),
    )
    // app.use(cors())
  
    const server = new ApolloServer({
      schema: await schema,
      context: ({ req }) => {
        const context = {
          req,
          user: req.user as TokenPayload
        };
        return context;
      },
      playground: {
        endpoint: '/self-menu/us-central1/api/graphql',
      },
    })

    await server.start()
    server.applyMiddleware({
      app,
      path,
      cors: {
        origin: '*',
        credentials: true
      },
    })

    return [server, app]
}