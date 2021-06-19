import { mongoose } from "@typegoose/typegoose"
import { Resolver, Query, Mutation, Arg, Root, FieldResolver, ResolverInterface, Field } from "type-graphql"
import { hashPassword } from "../../infraestrutura/autenticacao"
import { ContaModel, LojaModel, UsuarioModel } from "../models"
import { Usuario} from "../usuario/Usuario"
import { Conta } from "./Conta"
import { EntradaDeConta } from "./EntradaDeConta"

@Resolver(() => Conta)
export class ContaResolver implements ResolverInterface<Conta> {
  @Query(() => [Conta])
  contas() {
    return ContaModel.find()
  }

  @Query(() => Conta)
  conta(@Arg("id") id: string) {
    return ContaModel.findById(id)
  }

  @Mutation(() => Conta)
  async criarConta(@Arg("data") entrada: EntradaDeConta) {
    const dono = await UsuarioModel.create({
      nome: entrada.nome,
      login: entrada.login,
      senha: hashPassword(entrada.senha),
    })
    const conta = await ContaModel.create({
      nome: entrada.restaurante,
      dono,
    })
    await LojaModel.create({
      nome: entrada.restaurante,
      conta,
    })
    return conta
  }

  @Mutation(() => Boolean)
  async deleteConta(@Arg("id") id: string) {
    const conta = await ContaModel.findById(id)
    if (!conta) throw new Error("Conta não encontrada")
    await conta.remove()
    return true
  }

  @FieldResolver()
  async dono(@Root() conta: Conta) {
    const dono = await UsuarioModel.findOne(conta.dono)
    if (!dono) throw new Error('Dono não encontrado')
    return dono
  }

  @FieldResolver()
  async lojas(@Root() conta: Conta) {
    const lojas = await LojaModel.find(conta.lojas)
    if (!lojas) throw new Error('Lojas não encontrado')
    return lojas
  }
}
