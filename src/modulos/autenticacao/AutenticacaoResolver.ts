import { EntradaDeConta } from "../conta/EntradaDeConta";
import { RegistroDeConta } from "./RegistroDeConta";
import { Usuario } from "../usuario/Usuario";
import { Arg, FieldResolver, Mutation, Resolver, ResolverInterface, Root } from "type-graphql";
import { comparePassword, gerarToken, hashPassword } from "../../infraestrutura/autenticacao";
import { ContaModel, LojaModel, UsuarioModel } from "../models";
import { Autenticacao } from "./Autenticacao";

@Resolver(() => RegistroDeConta)
export class AutenticacaoResolver implements ResolverInterface<RegistroDeConta> {
	@Mutation(() => RegistroDeConta)
	async registrar(@Arg("entrada") entrada: EntradaDeConta): Promise<RegistroDeConta> {
		if (await UsuarioModel.exists({ email: entrada.email })) {
			throw new Error('Já existe conta com esse e-mail')
		}
		const dono = await UsuarioModel.create({
			nome: entrada.restaurante,
			login: entrada.email,
			email: entrada.email,
			senha: hashPassword(entrada.senha),
		})
		const conta = await ContaModel.create({
			nome: entrada.restaurante,
			usuarios: [],
			lojas: [],
			dono,
		})
		dono.contas.push(conta._id)
		await dono.save()
		const loja = await LojaModel.create({
			nome: entrada.restaurante,
			conta: [conta._id],
			editores: [dono._id],
		})

		conta.lojas.push(loja._id)
		conta.dono = dono._id
		await conta.save()

		return {
			usuario: dono.toObject<Usuario>(),
			token: gerarToken(dono),
		}
	}

	@Mutation(() => RegistroDeConta)
	async entrar(@Arg("autenticacao") autenticacao: Autenticacao): Promise<RegistroDeConta> {
		const usuario = await UsuarioModel
			.findOne({ email: autenticacao.email })
			.select('+senha')
		if (!usuario) throw new Error('Usuario não encontrado')

		if (!comparePassword(autenticacao.senha, usuario.senha))
			throw new Error('Senha inválida')

		return {
			usuario: usuario.toObject<Usuario>(),
			token: gerarToken(usuario),
		}
	}

	@FieldResolver()
	async usuario(@Root() registo: RegistroDeConta) {
		const usuario = await UsuarioModel.findById(registo.usuario).lean()
		if (!usuario) throw new Error('Usuário não encontrado')
		return usuario
	}
}
