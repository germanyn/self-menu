import { hashPassword } from "../../infraestrutura/autenticacao";
import { EntradaDeUsuario } from "./EntradaDeUsuario";
import { Usuario } from "./Usuario";


export default class UsuarioService {
    static async criarUsuario(entrada: EntradaDeUsuario): Promise<Usuario> {
        return await Usuario.create ({
            ...entrada,
            senha: hashPassword(entrada.senha),
          }).save()
    }
}