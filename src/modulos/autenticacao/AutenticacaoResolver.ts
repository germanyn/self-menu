import { Arg, Mutation, Resolver } from "type-graphql";
import { comparePassword, gerarToken } from "../../infraestrutura/autenticacao";
import { Usuario } from "../usuario/Usuario";
import { Autenticacao } from "./Autenticacao";

@Resolver()
export class AutenticacaoResolver {
	@Mutation(() => String)
	async entrar(@Arg("autenticacao") autenticacao: Autenticacao) {
		const usuario = await Usuario.findOne({ login: autenticacao.login })
		if (!usuario) throw new Error('Usuario não encontrado')

		if (!comparePassword(autenticacao.senha, usuario.senha))
			throw new Error('Senha inválida')
		
		
		return gerarToken(usuario);
	}
}
