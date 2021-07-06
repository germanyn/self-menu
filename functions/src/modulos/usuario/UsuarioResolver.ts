import { Arg, Authorized, FieldResolver, Query, Resolver, ResolverInterface, Root } from "type-graphql";
import { UsuarioModel } from "../models";
import { Usuario } from "./Usuario";

@Resolver(() => Usuario)
export class UsuarioResolver implements ResolverInterface<Usuario> {
  @Query(() => [Usuario])
  @Authorized()
  async usuarios() {
    return await UsuarioModel.find().lean()
  }

  @Query(() => Usuario)
  async usuario(@Arg("id") id: string) {
    const usuario = await UsuarioModel.findById(id).lean();
    if (!usuario) throw new Error('Usuário não encontrado')
    return usuario
  }

  @FieldResolver()
  async contas(@Root() usuario: Usuario) {
    const retorno = await UsuarioModel.populate(usuario, {
      path: 'contas',
      options: {
        lean: true,
      },
    })
    return retorno.contas
  }
}
