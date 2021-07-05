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
import { BuscarCardapioDocument, BuscarCardapioQuery, CategoriaDoCardapioFragment, CategoriaDoCardapioFragmentDoc, useMoverCategoriaDaLojaMutation } from "../../../generated/graphql";
import { useCardapio } from "../context/CardapioContext";
import {
    ArrastaveisEnum,
    CategoriaArrastavel,
    ItemArrastavel,
    ProdutoArrastavel
} from "./tipos";

type Params = {
    idRestaurante: string
    id: string
    indice: number
}

export const useCategoriaArrastavel = ({
    idRestaurante,
    id,
    indice,
}: Params) => {
    const { cache } = useApolloClient()
    const item: CategoriaArrastavel = {
        type: ArrastaveisEnum.CATEGORIA,
        id,
        indice,
        indiceOriginal: indice,
    }

    const { setEstaArrastandoCategoria, setSalvando } = useCardapio()
    const [ alterarOrdem ] = useMoverCategoriaDaLojaMutation()

    const buscaDeCardapio = cache.readQuery<BuscarCardapioQuery>({
        query: BuscarCardapioDocument,
        variables: { idRestaurante },
    })!;
    const { categorias } = buscaDeCardapio.loja

    const encontrarCategoria = useCallback(
        (id: string) => {
            const categoria = categorias
                .find(({ _id }) => _id === id)!

            return {
                categoria,
                indice: categorias.indexOf(categoria),
            }
        },
        [categorias],
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

    const moverCategoria = useCallback(
        (id: string, paraOIndice: number) => {
            const { categoria, indice } = encontrarCategoria(id)
            cache.writeQuery<BuscarCardapioQuery>({
                query: BuscarCardapioDocument,
                variables: { idRestaurante },
                data: {
                    ...buscaDeCardapio,
                    loja: {
                        ...buscaDeCardapio.loja,
                        categorias: update(categorias, {
                            $splice: [
                                [indice, 1],
                                [paraOIndice, 0, categoria],
                            ],
                        }),
                    },
                },
            });
        },
        [cache, buscaDeCardapio, encontrarCategoria, categorias, idRestaurante],
    )

    const moverProduto = useCallback(
        (idCategoria: string, idProduto: string, idCategoriaNova: string, novoIndice: number) => {
            const { produto, indice } = encontrarProduto(idCategoria, idProduto)
            if (!produto) return
            const { categoria: categoriaAnterior } = encontrarCategoria(idCategoria)
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
            const { categoria: categoriaNova } = encontrarCategoria(idCategoriaNova)
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
        [cache, encontrarCategoria, encontrarProduto],
    )

    const tratarHoverDeCategoria = (item: CategoriaArrastavel) => {
        if (item.id === id) return
        const { indice: novoIndice } = encontrarCategoria(id)
        moverCategoria(item.id, novoIndice)
    }

    const tratarHoverDeProduto = (item: ProdutoArrastavel) => {
        if (item.idCategoria === id) return
        moverProduto(item.idCategoria, item.id, id, -1)
        item.idCategoria = id
    }

    const dragHooks = useDrag<CategoriaArrastavel, never, { isDragging: boolean }>(
        () => ({
            type: ArrastaveisEnum.CATEGORIA,
            item: () => {
                setEstaArrastandoCategoria(true)
                return item
            },
            collect: (monitor) => ({ isDragging: monitor.isDragging() }),
            end: async (item, monitor) => {
                const { id, indiceOriginal } = item
                const didDrop = monitor.didDrop()
                if (didDrop) {
                    alterarOrdem({
                        variables: {
                            id: idRestaurante,
                            idCategoria: id,
                            indice: item.indice,
                        },
                    }).then(() => setSalvando(false))
                    setSalvando(true)
                } else {
                    moverCategoria(id, indiceOriginal)
                }
                setEstaArrastandoCategoria(false)
            },
        }),
        [id, indice, moverCategoria, setEstaArrastandoCategoria],
    )

    const dropHooks = useDrop<ItemArrastavel, never, { handlerId: Identifier | null }>(
        () => ({
            accept: [ArrastaveisEnum.CATEGORIA, ArrastaveisEnum.PRODUTO],
            collect(monitor) {
                return { handlerId: monitor.getHandlerId() }
            },
            canDrop: () => false,
            hover(item) {
                switch (item.type) {
                    case 'CATEGORIA':
                        return tratarHoverDeCategoria(item)
                    case 'PRODUTO':
                        return tratarHoverDeProduto(item)
                }
            },
        }),
        [moverCategoria, encontrarCategoria],
    )

    return {
        dropHooks,
        dragHooks,
    }
}
