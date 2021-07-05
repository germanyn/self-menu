export type ItemArrastavel = CategoriaArrastavel | ProdutoArrastavel

export type ItemArrastavelBase = {
    id: string
    indice: number
    indiceOriginal: number
    type: ArrastaveisEnum
}

export type CategoriaArrastavel = ItemArrastavelBase & {
    type: ArrastaveisEnum.CATEGORIA
}

export type ProdutoArrastavel = ItemArrastavelBase & {
    type: ArrastaveisEnum.PRODUTO
    idCategoria: string
    idCategoriaOriginal: string
}

export enum ArrastaveisEnum {
    CATEGORIA = 'CATEGORIA',
    PRODUTO = 'PRODUTO',
};

export type TiposArrastaveis = 
    | 'CATEGORIA'
    | 'PRODUTO'
