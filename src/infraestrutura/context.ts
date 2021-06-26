import { TokenPayload } from "./autenticacao";
import { JsonWebTokenError } from "jsonwebtoken";

export interface Context {
    jwtOriginalError?: JsonWebTokenError
    user?: TokenPayload
}

  