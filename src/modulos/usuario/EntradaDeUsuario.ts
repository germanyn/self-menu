import { InputType, Field } from "type-graphql";

@InputType()
export class EntradaDeUsuario {

  @Field({ nullable: false })
  nome: string;

  @Field({ nullable: false })
  login: string;

  @Field({ nullable: false })
  senha: string;
}
