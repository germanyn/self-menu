import { DocumentNode } from 'graphql'
import { SuperTest, Test } from 'supertest'
import { GQL_BASE_URL } from './constantes'
import { GraphqlResponse } from './supertestTypes'

export type OpcoesDaQuery<Variables = any> = {
    request: SuperTest<Test>
    queryDocument: DocumentNode
    variables?: Variables
    token?: string
}

export function fazerUmaQueryGraphql<Return = any, Variables = any>({
    request,
    queryDocument,
    variables,
    token,
}: OpcoesDaQuery<Variables>): Promise<GraphqlResponse<Return>> {
    const postRequest = request.post(GQL_BASE_URL)
    if (token) postRequest.set('Authorization', `Bearer ${token}`)
        
    return postRequest.send({
        query: queryDocument.loc?.source.body,
        variables,
    })
}