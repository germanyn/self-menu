import { mongoose } from "@typegoose/typegoose"
import { Resolver, Query, Mutation, Arg, Root, FieldResolver, ResolverInterface, Field } from "type-graphql"
import { gerarToken, hashPassword } from "../../infraestrutura/autenticacao"
import { ContaModel, LojaModel, UsuarioModel } from "../models"
import { Conta } from "./Conta"
import { EntradaDeConta } from "./EntradaDeConta"
import { RegistroDeConta } from "./RegistroDeConta"

@Resolver(() => Conta)
export class ContaResolver implements ResolverInterface<Conta> {
  @Query(() => [Conta])
  contas() {
    return ContaModel.find().lean()
  }

  @Query(() => Conta)
  conta(@Arg("id") id: string) {
    return ContaModel.findById(id).lean()
  }

  @Mutation(() => RegistroDeConta)
  async criarConta(@Arg("entrada") entrada: EntradaDeConta): Promise<RegistroDeConta> {
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
      conta: conta.toObject<Conta>(),
      token: gerarToken(dono),
    }
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
    const retorno = await ContaModel.populate(conta, {
      path: 'dono',
      options: {
        lean: true,
      },
    })
    return retorno.dono
  }

  @FieldResolver()
  async lojas(@Root() conta: Conta) {
    const retorno = await ContaModel.populate(conta, {
      path: 'lojas',
      options: {
        lean: true,
      },
    })
    return retorno.lojas
  }
}
