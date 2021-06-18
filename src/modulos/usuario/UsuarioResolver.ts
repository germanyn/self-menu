import { Resolver, Query, Arg, Authorized } from "type-graphql"
import { Usuario } from "./Usuario";

@Resolver()
export class UsuarioResolver {
  @Query(() => [Usuario])
  @Authorized()
  usuarios() {
    return Usuario.find();
  }

  @Query(() => Usuario)
  usuario(@Arg("id") id: string) {
    return Usuario.findOneOrFail(id);
  }
}
