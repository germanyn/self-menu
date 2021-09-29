import { Context } from 'infraestrutura/context';
import { PaginacaoArgs } from '../commons/Paginacao';
import { Types } from 'mongoose';
import { Arg, Args, Authorized, Ctx, FieldResolver, Int, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql';
import { LojaModel } from '../models';
import { EdicaoDeLoja } from './EdicaoDeLoja';
import { EntradaDeLoja } from './EntradaDeLoja';
import { Loja } from './Loja';

@Resolver(() => Loja)
export class LojaResolver implements ResolverInterface<Loja> {
    @Query(() => [Loja])
    async lojas(@Args() paginacao: PaginacaoArgs) {
        return LojaModel
            .find()
            .limit(paginacao.limit || 10)
            .skip(paginacao.offset || 0)
            .lean();
    }

    @Query(() => Loja)
    async loja(@Arg('id') id: string) {
        if (!Types.ObjectId.isValid(id)) throw new Error('Loja não encontrada')
        const loja = await LojaModel.findById(id).lean();
        if (!loja) throw new Error('Loja não encontrada')
        return loja
    }

    @Authorized()
    @Mutation(() => Loja)
    async criarLoja(@Arg('entrada') entrada: EntradaDeLoja) {
        const loja = await LojaModel.create({
            nome: entrada.nome,
            cnpj: entrada.cnpj,
            conta: entrada.contaId,
            endereco: entrada.endereco,
        })
        return loja.toObject()
    }

    @Authorized()
    @Mutation(() => Loja)
    async editarLoja(
        @Arg('id') id: string,
        @Arg('loja') entrada: EdicaoDeLoja,
    ) {
        const loja = await LojaModel.findById(id);
        if (!loja) throw new Error('Loja não encontrada')
        if (entrada.nome) loja.nome = entrada.nome
        return (await loja.save()).toObject<Loja>()
    }

    @Authorized()
    @Mutation(() => Boolean)
    async deletarLoja(@Arg('id') id: string) {
        await LojaModel.findByIdAndDelete(id);
        return true;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async alterarOrdemDaCategoria(
        @Arg('id') id: string,
        @Arg('idCategoria') idCategoria: string,
        @Arg('indice', () => Int) indice: number
    ) {
        const loja = await LojaModel.findById(id)
        if (!loja) throw new Error('Loja não encontrada')

        const indiceAtual = loja.categorias.indexOf(Types.ObjectId(idCategoria))
        if (indiceAtual === -1) throw new Error('Categoria não encontrada na loja')

        const [ categoria ] = loja.categorias.splice(indiceAtual, 1)
        loja.categorias.splice(indice, 0, categoria)
        await loja.save()
        return true
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
