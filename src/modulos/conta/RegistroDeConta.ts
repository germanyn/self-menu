import { ObjectType, Field, ID } from "type-graphql";
import { Conta } from "./Conta";

@ObjectType()
export class RegistroDeConta {
  @Field(() => String)
  token: string;

  @Field(() => Conta)
  conta: Conta;
}
