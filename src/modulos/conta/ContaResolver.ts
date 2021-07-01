import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  ResolverInterface,
  Root,
} from "type-graphql"
import { ContaModel } from "../models"
import { Conta } from "./Conta"

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
