import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql"
import { Loja } from "./Loja";
import { EntradaDeLoja } from "./EntradaDeLoja";

@Resolver()
export class LojaResolver {
    @Query(() => [Loja])
    lojas() {
        return Loja.find();
    }

    @Query(() => Loja)
    loja(@Arg("id") id: string) {
        return Loja.findOneOrFail(id);
    }

    @Authorized()
    @Mutation(() => Loja)
    async criarLoja(@Arg("data") entrada: EntradaDeLoja) {
        const loja = Loja.create(entrada)
        await loja.save();
        return loja;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async deletarLoja(@Arg("id") id: string) {
        const loja = await Loja.findOne(id);
        if (!loja) throw new Error("Loja não encontrada");
        await loja.remove();
        return true;
    }
}
