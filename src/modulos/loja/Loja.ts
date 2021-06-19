import { ObjectType, Field, ID } from "type-graphql";
import { Conta } from "../conta/Conta";
import { Endereco } from "../commons/Endereco";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@ObjectType()
export class Loja {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  nome: string;

  @Field(() => String, { nullable: true })
  @prop({
    type: () => Schema.Types.String
  })
  cnpj: string | null;

  @Field(() => Endereco, { nullable: true })
  @prop({
    type: () => Endereco,
  })
  endereco: Endereco | null

  @Field(() => Conta)
  @prop({
    ref: () => Conta,
    required: true,
  })
  conta: Conta
}
