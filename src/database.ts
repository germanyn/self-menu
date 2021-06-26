import { connect } from "mongoose";

export async function criarConexaoComBanco() {
    return await connect('mongodb://localhost:27017/Gardapio2', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
}