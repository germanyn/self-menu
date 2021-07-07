import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import { criarConexaoComBanco } from "./database"
import { SECRET, TokenPayload } from "./infraestrutura/autenticacao"
import schema from "./schema"
import express = require('express')
import jwt = require('express-jwt')

const app = express()

export default async function main() {
  await criarConexaoComBanco()

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
  // await new Promise(resolve => app.listen({ port: 4000 }, () => resolve(undefined)))
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return {
    app,
    server,
  }
}
