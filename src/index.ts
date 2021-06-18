import "reflect-metadata"
import { createConnection } from "typeorm"
import { ApolloServer } from "apollo-server-koa"
import entities from "./entidades"
import schema from "./schema"
import koa from 'koa'
import jwt = require('koa-jwt')
import { SECRET } from "./infraestrutura/autenticacao"
import { Context } from "./infraestrutura/context"

async function main() {
  await createConnection({
    type: 'mongodb',
    database: 'Gardapio',
    entities,
  })

  const app = new koa()

  const path = "/graphql"

  app.use(
    jwt({
      secret: SECRET,
      passthrough: true,
    }),
  )

  const server = new ApolloServer({
    schema: await schema,
    context: ({ ctx }): Context => {
      return ctx
    },
  })
  await server.start()
  server.applyMiddleware({ app, path })
  await new Promise(resolve => app.listen({ port: 4000 }, () => resolve(undefined)))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}


main()
