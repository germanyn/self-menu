import { SuperTest, Test } from 'supertest'
import { CriarProduto, CriarProdutoMutation, CriarProdutoMutationVariables } from "../../graphql/generated"
import { fazerUmaQueryGraphql } from '../../helpers/graphqlRequestUtils'

export function requisitarNovoProduto(
    request: SuperTest<Test>,
    criacaoDeProduto: CriarProdutoMutationVariables,
    token?: string,
) {
    return fazerUmaQueryGraphql<CriarProdutoMutation, typeof criacaoDeProduto>({
        request,
        queryDocument: CriarProduto,
        variables: criacaoDeProduto,
        token,
    })
}

export async function criarNovoProduto(
    request: SuperTest<Test>,
    criacaoDeProduto: CriarProdutoMutationVariables,
    token?: string,
) {
    return requisitarNovoProduto(request, criacaoDeProduto, token)
        .then(({ body }) => body.data!.criarProduto)
}

export const gerarVariaveisDeCriacaoDeProduto = (idDaConta: string): CriarProdutoMutationVariables => ({
    produto: {
        nome: 'Produto de Teste',
        contaId: idDaConta,
    }
})