import { Ordenacao } from "../modulos/commons/Paginacao"

export function converterOrdenacaoParaMongoose(ordenacao?: OrdenacaoDaApi): [string, 'asc' | 'desc'][] {
	return ordenacao
		? Object.entries(ordenacao)
		: []
}

// export type OrdenacaoDaApi = Record<string, Ordenacao>

export type OrdenacaoDaApi = {
	[key: string]: Ordenacao
}
