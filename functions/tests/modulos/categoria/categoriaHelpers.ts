import { SuperTest, Test } from 'supertest'
import { CriarCategoria, CriarCategoriaMutation, CriarCategoriaMutationVariables } from "../../graphql/generated"
import { fazerUmaQueryGraphql } from '../../helpers/graphqlRequestUtils'

export function requisitarNovaCategoria(
    request: SuperTest<Test>,
    criacaoDeCategoria: CriarCategoriaMutationVariables,
    token?: string,
) {
    return fazerUmaQueryGraphql<CriarCategoriaMutation, typeof criacaoDeCategoria>({
        request,
        queryDocument: CriarCategoria,
        variables: criacaoDeCategoria,
        token,
    })
}

export async function criarNovaCategoria(
    request: SuperTest<Test>,
    criacaoDeCategoria: CriarCategoriaMutationVariables,
    token?: string,
) {
    return requisitarNovaCategoria(request, criacaoDeCategoria, token)
        .then(({ body: { data } }) => data!.criarCategoria)
}

export const gerarVariaveisDeCriacaoDeCategoria = (idDoRestaurante: string): CriarCategoriaMutationVariables => ({
    categoria: {
        lojaId: idDoRestaurante,
        nome: 'Categoria de Teste',
    }
})