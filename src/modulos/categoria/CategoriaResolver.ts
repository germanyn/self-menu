import { Types } from "mongoose";
import { Arg, Authorized, FieldResolver, Int, Mutation, Resolver, ResolverInterface, Root } from "type-graphql";
import { CategoriaModel, LojaModel } from "../models";
import { Categoria } from "./Categoria";
import {
    CriacaoDeCategoria,
    EdicaoDeCategoria,
} from "./entradas/EntradaDeCategoria";

@Resolver(() => Categoria)
export class CategoriaResolver implements ResolverInterface<Categoria> {

    @Authorized()
    @Mutation(() => Categoria)
    async criarCategoria(
        @Arg("categoria") entrada: CriacaoDeCategoria
    ) {
        const loja = await LojaModel.findById(entrada.lojaId);
        if (!loja) throw new Error('Loja não encontrada')

        const categoria = await CategoriaModel.create({
            nome: entrada.nome,
            loja: loja._id,
            conta: loja.conta,
        })

        loja.categorias.push(categoria)
        await loja.save()
        return categoria.toObject()
    }

    @Authorized()
    @Mutation(() => Categoria)
    async editarCategoria(
        @Arg("id") id: String,
        @Arg("categoria") entrada: EdicaoDeCategoria,
    ) {
        const categoria = await CategoriaModel
            .findByIdAndUpdate(id, entrada, { new: true })
            .lean()
        if (!categoria) throw new Error('Categoria não encontrada')

        return categoria
    }

    @Authorized()
    @Mutation(() => Boolean)
    async deletarCategoria(@Arg("id") id: string) {
        await CategoriaModel.findByIdAndDelete(id);
        return true;
    }

    @Authorized()
    @Mutation(() => Boolean)
    async moverProdutoEntreCategorias(
        @Arg("idCategoria") idCategoria: string,
        @Arg("idProduto") idProduto: string,
        @Arg("indice", () => Int) indice: number,
        @Arg("idCategoriaNova", { nullable: true }) idCategoriaNova?: string,
    ) {
        const categoria = await CategoriaModel.findById(idCategoria)
        if (!categoria) throw new Error('Categoria não encontrada')
        const categoriaNova = !idCategoriaNova || idCategoria === idCategoriaNova
            ? categoria
            : await CategoriaModel.findById(idCategoriaNova)
        if (!categoriaNova) throw new Error('Categoria nova não encontrada')


        const indiceAtual = categoria.produtos.indexOf(Types.ObjectId(idProduto))
        if (indiceAtual === -1) throw new Error('Categoria não encontrada na loja')

        const [produto] = categoria.produtos.splice(indiceAtual, 1)
        categoriaNova.produtos.splice(indice, 0, produto)

        await categoria.save()
        if (idCategoriaNova) await categoriaNova.save()

        return true;
    }

    @FieldResolver()
    async conta(@Root() categoria: Categoria) {
        const retorno = await CategoriaModel.populate(categoria, {
            path: 'conta',
            options: {
                lean: true,
            },
        })
        return retorno.conta
    }

    @FieldResolver()
    async produtos(@Root() categoria: Categoria) {
        const retorno = await CategoriaModel.populate(categoria, {
            path: 'produtos',
            options: {
                lean: true,
            },
        })
        return retorno.produtos || []
    }
}
