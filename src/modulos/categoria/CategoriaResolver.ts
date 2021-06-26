import { Arg, Authorized, FieldResolver, Mutation, Resolver, ResolverInterface, Root } from "type-graphql";
import { CategoriaModel, LojaModel } from "../models";
import { Categoria } from "./Categoria";
import { EntradaDeCategoria } from "./EntradaDeCategoria";

@Resolver(() => Categoria)
export class CategoriaResolver implements ResolverInterface<Categoria> {

    @Authorized()
    @Mutation(() => Categoria)
    async criarCategoria(
        @Arg("data") entrada: EntradaDeCategoria
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
    @Mutation(() => Boolean)
    async deletarCategoria(@Arg("id") id: string) {
        await CategoriaModel.findByIdAndDelete(id);
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
