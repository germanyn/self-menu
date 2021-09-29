import { AuthenticationError } from 'apollo-server-errors'
import { compareSync, hashSync } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { AuthChecker } from 'type-graphql'
import { Usuario } from '../modulos/usuario/Usuario'
import { Context } from './context'

export const SECRET: string = 'SECRET'

export const hashPassword = (password: string) => {
    return hashSync(password, 12)
}

export const comparePassword = (senhaPlana: string, hash: string) => {
    return compareSync(senhaPlana, hash)
}

export const gerarToken = (usuario: Usuario) => {
    const payload: TokenPayload = {
        iss: usuario._id.toString(),
    }
    return sign(payload, SECRET)
}

export const customAuthChecker: AuthChecker<any> = ({ context }: { context: Context }) => {
    if (context.jwtOriginalError)
        throw new AuthenticationError(context.jwtOriginalError.message)
    if (!context.user)
        throw new AuthenticationError('Sem autorização')
    return true
};

export interface TokenPayload {
    /** conta */
    iss: string
    /** criado em */
    iat?: string 
}

