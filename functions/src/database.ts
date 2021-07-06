import { connect } from "mongoose";

export async function criarConexaoComBanco() {
  const url =  process.env.NODE_ENV === 'production'
    ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.tnloq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    : 'mongodb://localhost:27017/Gardapio2'
    return await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
    })
}