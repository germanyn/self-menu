import { Resolver, Query, Mutation, Arg } from "type-graphql"
import { getConnection, Transaction } from "typeorm";
import { hashPassword } from "../../infraestrutura/autenticacao";
import { Loja } from "../loja/Loja";
import { Usuario } from "../usuario/Usuario";
import UsuarioService from "../usuario/UsuarioService";
import { Conta } from "./Conta";
import { EntradaDeConta } from "./EntradaDeConta"

@Resolver()
export class ContaResolver {
  @Query(() => [Conta])
  contas() {
    return Conta.find();
  }

  @Query(() => Conta)
  conta(@Arg("id") id: string) {
    return Conta.findOneOrFail({ where: { id } });
  }

  @Mutation(() => Conta)
  async criarConta(@Arg("data") entrada: EntradaDeConta) {
    let conta: Conta
    let loja: Loja
    let dono: Usuario
    conta = Conta.create({
      nome: entrada.restaurante,
    })
    dono = Usuario.create({
      nome: entrada.nome,
      login: entrada.login,
      senha: hashPassword(entrada.senha),
      contas: [
        conta,
      ],
    })
    loja = Loja.create({
      nome: entrada.restaurante,
      conta: Promise.resolve(conta),
    })
    return conta;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("id") id: string) {
    const book = await Conta.findOne({ where: { id } });
    if (!book) throw new Error("Conta não encontrada");
    await book.remove();
    return true;
  }
}
