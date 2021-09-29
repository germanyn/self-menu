import { SuperTest, Test } from "supertest";
import { BuscarLoja, BuscarLojaQuery, BuscarLojaQueryVariables, CriarLoja, CriarLojaMutation, CriarLojaMutationVariables } from "../../graphql/generated";
import { fazerUmaQueryGraphql } from "../../helpers/graphqlRequestUtils";

export function requisitarUmaLoja(
    request: SuperTest<Test>,
    variables: BuscarLojaQueryVariables,
    token?: string,
) {
    return fazerUmaQueryGraphql<BuscarLojaQuery, typeof variables>({
        request,
        queryDocument: BuscarLoja,
        variables,
        token,
    })
}

export function requisitarNovaLoja(
    request: SuperTest<Test>,
    variables: CriarLojaMutationVariables,
    token?: string,
) {
    return fazerUmaQueryGraphql<CriarLojaMutation, typeof variables>({
        request,
        queryDocument: CriarLoja,
        variables,
        token,
    })
}

export function criarNovaLoja(
    request: SuperTest<Test>,
    variaveisOuConta: CriarLojaMutationVariables | string,
    token?: string,
) {
    return requisitarNovaLoja(
        request,
        typeof variaveisOuConta === 'string'
            ? gerarVariaveisDeCriacaoDeLoja(variaveisOuConta)
            : variaveisOuConta,
        token,
    )
}

export const gerarVariaveisDeCriacaoDeLoja = (idDaConta: string): CriarLojaMutationVariables => ({
    entrada: {
        contaId: idDaConta,
        nome: 'Loja de Teste',
    }
})