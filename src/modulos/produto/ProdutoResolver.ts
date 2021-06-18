import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql"
import { Produto } from "./Produto";
import { EntradaDeProduto } from "./EntradaDeProduto";

@Resolver()
export class ProdutoResolver {
  @Query(() => [Produto])
  produtos() {
    return Produto.find();
  }

  @Query(() => Produto)
  produto(@Arg("id") id: string) {
    return Produto.findOneOrFail({ where: { id } });
  }

  @Authorized()
  @Mutation(() => Produto)
  async criarProduto(@Arg("data") entrada: EntradaDeProduto) {
    const produto = Produto.create(entrada);
    await produto.save();
    return produto;
  }
}
