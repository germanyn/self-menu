import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import { criarConexaoComBanco } from "./database"
import { SECRET, TokenPayload } from "./infraestrutura/autenticacao"
import schema from "./schema"
import express = require('express')
import jwt = require('express-jwt')

async function main() {
  await criarConexaoComBanco()
  
  const app = express()

  const path = "/graphql"

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
  })
  await server.start()
  server.applyMiddleware({
    app,
    path,
    cors: {
      origin: 'http://localhost:3000',
      credentials: true
    },
  })
  await new Promise(resolve => app.listen({ port: 4000 }, () => resolve(undefined)))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}


main()
