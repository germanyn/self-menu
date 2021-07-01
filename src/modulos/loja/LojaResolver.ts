import { Resolver, Query, Mutation, Arg, Authorized, ResolverInterface, Root, FieldResolver, Ctx } from "type-graphql"
import { Loja } from "./Loja";
import { EntradaDeLoja } from "./EntradaDeLoja";
import { ContaModel, LojaModel } from "../models";
import { Context } from "infraestrutura/context";
import { Types } from "mongoose";
import { EdicaoDeLoja } from "./EdicaoDeLoja";

@Resolver(() => Loja)
export class LojaResolver implements ResolverInterface<Loja> {
    @Query(() => [Loja])
    async lojas() {
        return LojaModel.find().lean();
    }

    @Query(() => Loja)
    async loja(@Arg("id") id: string) {
        const loja = await LojaModel.findById(id).lean();
        if (!loja) throw new Error('Loja não encontrada')
        return loja
    }

    @Authorized()
    @Mutation(() => Loja)
    async criarLoja(@Arg("data") entrada: EntradaDeLoja) {
        return LojaModel.create(entrada)
    }

    @Authorized()
    @Mutation(() => Loja)
    async editarLoja(
        @Arg("id") id: string,
        @Arg("loja") entrada: EdicaoDeLoja,
    ) {
        const loja = await LojaModel.findById(id);
        if (!loja) throw new Error('Loja não encontrada')
        if (entrada.nome) loja.nome = entrada.nome
        return (await loja.save()).toObject<Loja>()
    }

    @Authorized()
    @Mutation(() => Boolean)
    async deletarLoja(@Arg("id") id: string) {
        await LojaModel.findByIdAndDelete(id);
        return true;
    }

    @FieldResolver()
    async conta(@Root() loja: Loja) {
        const retorno = await LojaModel.populate(loja, {
            path: 'conta',
            options: {
                lean: true,
            },
        })
        return retorno.conta
    }

    @FieldResolver()
    podeEditar(
        @Ctx(){ user }: Context,
        @Root() loja: Loja
    ): boolean {
        loja.editores.includes(Types.ObjectId(user?.iss))
        return user
            ? loja.editores.some(editor => editor && editor.toString() === user.iss)
            : false
    }

    @FieldResolver()
    async categorias(@Root() loja: Loja) {
        const retorno = await LojaModel.populate(loja, {
            path: 'categorias',
            options: {
                lean: true,
            },
        })
        return retorno.categorias
    }
}
