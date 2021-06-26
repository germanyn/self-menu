import { Arg, Mutation, Resolver } from "type-graphql";
import { comparePassword, gerarToken } from "../../infraestrutura/autenticacao";
import { UsuarioModel } from "../models";
import { Autenticacao } from "./Autenticacao";

@Resolver()
export class AutenticacaoResolver {
	@Mutation(() => String)
	async entrar(@Arg("autenticacao") autenticacao: Autenticacao) {
		const usuario = await UsuarioModel
			.findOne({ login: autenticacao.login })
			.select('+senha')
		if (!usuario) throw new Error('Usuario não encontrado')

		if (!comparePassword(autenticacao.senha, usuario.senha))
			throw new Error('Senha inválida')
		
		return gerarToken(usuario);
	}
}
