import { TokenPayload } from "./autenticacao";
import { BaseContext } from "koa";
import { JsonWebTokenError } from "jsonwebtoken";
import { MikroORM } from "@mikro-orm/core";

export interface Context extends BaseContext {
    state: {
        jwtOriginalError?: JsonWebTokenError
        user?: TokenPayload
    },
}

  