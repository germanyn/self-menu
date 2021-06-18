import { hashSync, compareSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AuthChecker } from 'type-graphql'
import { Usuario } from '../modulos/usuario/Usuario'
import { Context } from './context'

export const SECRET = 'SECRET'

export const hashPassword = (password: string) => {
    return hashSync(password, 12)
}

export const comparePassword = (senhaPlana: string, hash: string) => {
    return compareSync(senhaPlana, hash)
}

export const gerarToken = (usuario: Usuario) => {
    const payload: TokenPayload = {
        iss: usuario.id,
    }
    return sign(payload, SECRET)
}

export const customAuthChecker: AuthChecker<any> = ({ context }: { context: Context }) => {
    if (context.state.jwtOriginalError) {
        throw context.state.jwtOriginalError
    }
    return true;
};

export interface TokenPayload {
    iss: string
    iat?: string 
}

