import "reflect-metadata"
import { initFirebaseApp } from "./utils/firebaseUtils"
import { criarConexaoComBanco } from "./infraestrutura/database"
import { setupServer } from "./infraestrutura/server"

export default async function main() {
  await Promise.all([
    criarConexaoComBanco(),
    initFirebaseApp(),
  ])
  const [server, app] = await setupServer()
  // await new Promise(resolve => app.listen({ port: 4000 }, () => resolve(undefined)))
  // console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return {
    app,
    server,
  }
}
