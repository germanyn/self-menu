import { Field, ObjectType } from "type-graphql";
import { Usuario } from "../usuario/Usuario";

@ObjectType()
export class RegistroDeConta {
  @Field(() => String)
  token: string;

  @Field(() => Usuario)
  usuario: Usuario;
}
