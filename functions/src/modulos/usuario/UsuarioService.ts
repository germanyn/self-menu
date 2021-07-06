import { UsuarioModel } from "modulos/models";
import { hashPassword } from "../../infraestrutura/autenticacao";
import { EntradaDeUsuario } from "./EntradaDeUsuario";
import { Usuario } from "./Usuario";

export default class UsuarioService {
    static async criarUsuario(entrada: EntradaDeUsuario): Promise<Usuario> {
        return await UsuarioModel.create({
            ...entrada,
            senha: hashPassword(entrada.senha),
        })
    }
}