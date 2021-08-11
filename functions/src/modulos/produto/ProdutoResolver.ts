import { Arg, Authorized, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from "type-graphql"
import { CategoriaModel, ProdutoModel } from "../models"
import { EntradaDeProduto } from "./EntradaDeProduto"
import { Produto } from "./Produto"

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
      descricao: entrada.descricao,
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
      descricao: entrada.descricao,
    }, { new: true }).lean()
    if (!produto) throw new Error('Produto não encontrado')
    return produto
  }

  @Authorized()
  @Mutation(() => Boolean)
  async excluirProduto(@Arg("id") id: string) {
    await ProdutoModel.findByIdAndDelete(id)
    await CategoriaModel.updateMany({}, {
      $pull: { produtos: id },
    })
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
