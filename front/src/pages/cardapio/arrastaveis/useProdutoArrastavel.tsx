import { useApolloClient } from "@apollo/client";
import {
    Identifier
} from 'dnd-core';
import update from 'immutability-helper';
import { useCallback } from 'react';
import {
    useDrag,
    useDrop
} from "react-dnd";
import { CategoriaDoCardapioFragment, CategoriaDoCardapioFragmentDoc, useMoverProdutoEntreCategoriasMutation } from "../../../generated/graphql";
import { useCardapio } from "../context/CardapioContext";
import {
    ArrastaveisEnum,
    ProdutoArrastavel
} from "./tipos";

type Params = {
    id: string
    ref: React.RefObject<any>
    indice: number
    indiceCategoria: number
    idCategoria: string
}

export const useProdutoArrastavel = ({
    id,
    indice,
    idCategoria,
}: Params) => {

    const { cache } = useApolloClient()

    const [moverProdutoEntreCategorias] = useMoverProdutoEntreCategoriasMutation()

    const { setSalvando } = useCardapio()

    const buscarCategoria = useCallback(
        (id: string) => {
            return cache.readFragment<CategoriaDoCardapioFragment>({
                id: `Categoria:${id}`,
                fragment: CategoriaDoCardapioFragmentDoc,
                fragmentName: 'CategoriaDoCardapio',
            })!
        },
        [cache],
    )

    const encontrarProduto = useCallback(
        (idCategoria: string, id: string) => {
            const categoria = cache.readFragment<CategoriaDoCardapioFragment>({
                id: `Categoria:${idCategoria}`,
                fragment: CategoriaDoCardapioFragmentDoc,
                fragmentName: 'CategoriaDoCardapio',
            })!
            const produto = categoria.produtos
                .find(({ _id }) => _id === id)!

            return {
                produto,
                indice: categoria.produtos.indexOf(produto),
            }
        },
        [cache],
    )

    const item: ProdutoArrastavel = {
        type: ArrastaveisEnum.PRODUTO,
        id,
        idCategoria,
        indice,
        idCategoriaOriginal: idCategoria,
        indiceOriginal: indice,
    }

    const moverProduto = useCallback(
        (idCategoria: string, idProduto: string, idCategoriaNova: string, novoIndice: number) => {
            const { produto, indice } = encontrarProduto(idCategoria, idProduto)
            const categoriaAnterior = buscarCategoria(idCategoria)
            cache.writeFragment<CategoriaDoCardapioFragment>({
                id: `Categoria:${idCategoria}`,
                fragment: CategoriaDoCardapioFragmentDoc,
                fragmentName: 'CategoriaDoCardapio',
                data: {
                    ...categoriaAnterior,
                    produtos: update(categoriaAnterior.produtos, {
                        $splice: idCategoria === idCategoriaNova
                            ? [
                                [indice, 1],
                                [novoIndice, 0, produto]
                            ]
                            : [[indice, 1]],
                    }),
                }
            })
            if (idCategoria === idCategoriaNova) return
            const categoriaNova = buscarCategoria(idCategoriaNova)
            cache.writeFragment<CategoriaDoCardapioFragment>({
                id: `Categoria:${idCategoriaNova}`,
                fragment: CategoriaDoCardapioFragmentDoc,
                fragmentName: 'CategoriaDoCardapio',
                data: {
                    ...categoriaNova,
                    produtos: update(categoriaNova.produtos, {
                        $splice: [[novoIndice, 0, produto]],
                    }),
                }
            })
        },
        [cache, buscarCategoria, encontrarProduto],
    )

    const dragHooks = useDrag<ProdutoArrastavel, never, { isDragging: boolean }>(
        () => ({
            type: ArrastaveisEnum.PRODUTO,
            item: () => item,
            collect: (monitor: any) => ({ isDragging: monitor.isDragging() }),
            end: async (item, monitor) => {
                const { idCategoria, id, idCategoriaOriginal, indiceOriginal } = item
                const didDrop = monitor.didDrop()
                if (didDrop) {
                    moverProdutoEntreCategorias({
                        variables: {
                            idCategoria: idCategoriaOriginal,
                            idCategoriaNova: idCategoria,
                            idProduto: id,
                            indice: item.indice,
                        },
                    }).then(() => setSalvando(false))
                    setSalvando(true)
                } else {
                    moverProduto(idCategoria, id, idCategoriaOriginal, indiceOriginal)
                }
            },
        }),
        [id, indice, moverProduto],
    )

    const dropHooks = useDrop<ProdutoArrastavel, never, { handlerId: Identifier | null }>(
        () => ({
            accept: ArrastaveisEnum.PRODUTO,
            collect(monitor) {
                return { handlerId: monitor.getHandlerId() }
            },
            canDrop: () => false,
            hover(itemHover) {
                if (itemHover.id === id || itemHover.idCategoria !== idCategoria) return
                const { indice: novoIndice } = encontrarProduto(idCategoria, id)
                moverProduto(itemHover.idCategoria, itemHover.id, idCategoria, novoIndice)

            },
        }),
        [moverProduto, encontrarProduto],
    )

    return {
        dragHooks,
        dropHooks,
    }
}