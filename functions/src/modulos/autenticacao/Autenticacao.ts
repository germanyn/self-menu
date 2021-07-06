import { Field, InputType } from "type-graphql";

@InputType()
export class Autenticacao {
  @Field()
  email: string;

  @Field()
  senha: string;
}
