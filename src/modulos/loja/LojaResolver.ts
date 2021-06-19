import { Resolver, Query, Mutation, Arg, Authorized, ResolverInterface, Root, FieldResolver } from "type-graphql"
import { Loja } from "./Loja";
import { EntradaDeLoja } from "./EntradaDeLoja";
import { ContaModel, LojaModel } from "../models";

@Resolver(() => Loja)
export class LojaResolver implements ResolverInterface<Loja> {
    @Query(() => [Loja])
    lojas() {
        return LojaModel.find();
    }

    @Query(() => Loja)
    loja(@Arg("id") id: string) {
        return LojaModel.findById(id);
    }

    @Authorized()
    @Mutation(() => Loja)
    async criarLoja(@Arg("data") entrada: EntradaDeLoja) {
        return LojaModel.create(entrada)
    }

    @Authorized()
    @Mutation(() => Boolean)
    async deletarLoja(@Arg("id") id: string) {
        await LojaModel.findByIdAndDelete(id);
        return true;
    }

    @FieldResolver()
    async conta(@Root() loja: Loja) {
      const conta = await ContaModel.findOne(loja.conta)
      if (!conta) throw new Error('Conta não encontrado')
      return conta
    }
}
