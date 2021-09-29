import { ExecutionResult } from 'graphql';
import { Response } from 'supertest'

export interface GraphqlResponse<T = any> extends Response {
    body: ExecutionResult<T>
}
