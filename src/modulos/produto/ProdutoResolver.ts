import { Resolver, Query, Mutation, Arg, Authorized, ResolverInterface, Root, FieldResolver, Ctx } from "type-graphql"
import { Produto } from "./Produto"
import { EntradaDeProduto } from "./EntradaDeProduto"
import { CategoriaModel, ContaModel, ProdutoModel } from "../models"
import { Context } from "infraestrutura/context"

@Resolver(() => Produto)
export class ProdutoResolver implements ResolverInterface<Produto> {
  @Query(() => [Produto])
  produtos() {
    return ProdutoModel.find().lean()
  }

  @Query(() => Produto)
  produto(@Arg("id") id: string) {
    return ProdutoModel.findById(id).lean()
  }

  @Authorized()
  @Mutation(() => Produto)
  async criarProduto(@Arg("data") entrada: EntradaDeProduto) {
    const produto = await ProdutoModel.create({
      nome: entrada.nome,
      preco: entrada.preco,
      conta: entrada.contaId,
    })
    if (entrada.categoriaId)
      await CategoriaModel.findByIdAndUpdate(entrada.categoriaId, {
        $push: { produtos: produto._id } }
      );
    return produto.toObject()
  }

  @Authorized()
  @Mutation(() => Produto)
  async editarProduto(
    @Arg("id") id: String,
    @Arg("produto") entrada: EntradaDeProduto
  ) {
    const produto = await ProdutoModel.findByIdAndUpdate(id, {
      nome: entrada.nome,
      preco: entrada.preco,
    }, { new: true })
    if (!produto) throw new Error('Produto não encontrado')
    if (entrada.categoriaId)
      await CategoriaModel.findByIdAndUpdate(entrada.categoriaId, {
        $push: { produtos: id } }
      )
    return produto.toObject()
  }

  @Authorized()
  @Mutation(() => Boolean)
  async excluirProduto(@Arg("id") id: string) {
    await ProdutoModel.findByIdAndDelete(id)
    await CategoriaModel.updateMany({}, {
      $pull: { produtos: id },
    }
    )
    return true
  }

  @FieldResolver()
  async conta(@Root() produto: Produto) {
    const resultado = await ProdutoModel.populate(produto, {
      path: 'conta',
      options: { lean: true },
    })
    return resultado.conta
  }
}
