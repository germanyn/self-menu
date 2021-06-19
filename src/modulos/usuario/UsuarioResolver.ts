import { Resolver, Query, Arg, Authorized, FieldResolver } from "type-graphql"
import { UsuarioModel } from "../models";
import { Usuario } from "./Usuario";

@Resolver(() => Usuario)
export class UsuarioResolver {
  @Query(() => [Usuario])
  @Authorized()
  usuarios() {
    return UsuarioModel.find();
  }

  @Query(() => Usuario)
  usuario(@Arg("id") id: string) {
    return UsuarioModel.findById(id);
  }
}
