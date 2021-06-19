import { ObjectType, Field, ID } from "type-graphql";
import { Conta } from "../conta/Conta";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

@ObjectType()
export class Usuario {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({
    required: true,
  })
  nome: string;

  @Field(() => String)
  @prop({
    required: true,
  })
  login: string;

  @prop({
    select: false,
    required: true,
  })
  senha: string;

  @prop({
    ref: () => Conta,
  })
  contas: Conta[]
}
