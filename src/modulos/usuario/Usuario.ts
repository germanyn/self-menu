import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { ObjectId, Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Conta } from "../conta/Conta";

@ObjectType()
export class Usuario {
  @Field(() => ID)
  _id: Types.ObjectId

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

  @Field(() => String)
  @prop()
  email: string;

  @prop({
    select: false,
    required: true,
  })
  senha: string;

  @Field(() => Conta)
  @prop({
    ref: () => Conta,
  })
  contas: Ref<Conta>[]
}
