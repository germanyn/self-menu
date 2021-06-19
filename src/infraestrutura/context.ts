import { TokenPayload } from "./autenticacao";
import { BaseContext } from "koa";
import { JsonWebTokenError } from "jsonwebtoken";

export interface Context extends BaseContext {
    state: {
        jwtOriginalError?: JsonWebTokenError
        user?: TokenPayload
    },
}

  