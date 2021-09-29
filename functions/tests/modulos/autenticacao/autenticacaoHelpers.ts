import { SuperTest, Test } from 'supertest'
import { Registrar, RegistrarMutation, RegistrarMutationVariables } from "../../graphql/generated"
import { fazerUmaQueryGraphql } from "../../helpers/graphqlRequestUtils"
import { GraphqlResponse } from "../../helpers/supertestTypes"

export async function requisitarNovaConta(request: SuperTest<Test>, variaveis?: RegistrarMutationVariables): Promise<GraphqlResponse<RegistrarMutation>> {
    return fazerUmaQueryGraphql<RegistrarMutation, RegistrarMutationVariables>({
        request,
        queryDocument: Registrar,
        variables: variaveis,
    })
}

export async function criarNovaConta(request: SuperTest<Test>, criacaoDeRegistro?: RegistrarMutationVariables) {
    return requisitarNovaConta(request, criacaoDeRegistro || gerarVariaveisDeRegistro())
        .then(({ body }) => body.data!.registrar)
}

export const gerarVariaveisDeRegistro = (): RegistrarMutationVariables => ({
    entrada: {
        email: 'teste@email.com',
        restaurante: 'Teste Cantina Restaurante',
        senha: 'senha123',
    }
})