import { Resolver, Query, Mutation, Arg, Authorized, ResolverInterface, Root, FieldResolver } from "type-graphql"
import { Produto } from "./Produto"
import { EntradaDeProduto } from "./EntradaDeProduto"
import { ContaModel, ProdutoModel } from "../models"

@Resolver(() => Produto)
export class ProdutoResolver implements ResolverInterface<Produto> {
  @Query(() => [Produto])
  produtos() {
    return ProdutoModel.find()
  }

  @Query(() => Produto)
  produto(@Arg("id") id: string) {
    return ProdutoModel.findById(id)
  }

  @Authorized()
  @Mutation(() => Produto)
  async criarProduto(@Arg("data") entrada: EntradaDeProduto) {
    return ProdutoModel.create(entrada)
  }

  @FieldResolver()
  async conta(@Root() produto: Produto) {
    const conta = await ContaModel.findOne(produto.conta)
    if (!conta) throw new Error('Conta não encontrado')
    return conta
  }
}
