import { Field, InputType } from "type-graphql";

@InputType()
export class Autenticacao {
  @Field(() => String)
  login: string;

  @Field(() => String)
  senha: string;
}
