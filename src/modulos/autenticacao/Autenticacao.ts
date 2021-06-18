import { BaseEntity } from "typeorm";
import { Field, InputType } from "type-graphql";

@InputType()
export class Autenticacao extends BaseEntity {
  @Field(() => String)
  login: string;

  @Field(() => String)
  senha: string;
}
