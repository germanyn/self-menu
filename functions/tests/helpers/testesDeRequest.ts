import { GraphqlResponse } from "./supertestTypes"

export function testarRespostaBemSucedida(response: GraphqlResponse<any>) {
    expect(response.statusCode).toBe(200)
    expect(response.body.errors).toBeUndefined()
    expect(response.body.data).toBeDefined()
    expect(response.body.data).not.toBeNull()
}

export function testaRespostaComErro(response: GraphqlResponse<any>) {
    expect(response.statusCode).toBe(200)
    expect(response.body.errors).toBeDefined()
    expect(response.body.data).toBeNull()
}

export function testarRespostaComErroNaoAutenticado(response: GraphqlResponse<any>) {
    testaRespostaComErro(response)
    expect(response.body.errors![0].extensions!.code).toBe('UNAUTHENTICATED')
    expect(response.body.errors![0].message).toBe('Sem autorização')
}
