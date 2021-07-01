import { Usuario } from "../usuario/Usuario";
import { ObjectType, Field, ID } from "type-graphql";
import { Conta } from "../conta/Conta";

@ObjectType()
export class RegistroDeConta {
  @Field(() => String)
  token: string;

  @Field(() => Usuario)
  usuario: Usuario;
}
