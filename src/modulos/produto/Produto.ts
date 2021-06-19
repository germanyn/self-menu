import { ObjectType, Field, ID, Float } from "type-graphql";
import { Conta } from "../conta/Conta";
import { prop, Ref } from "@typegoose/typegoose";

@ObjectType()
export class Produto {
  @Field(() => ID)
  @prop()
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  nome: string;

  @Field(() => Float)
  @prop()
  preco: number;

  @Field(() => Conta)
  @prop({
    ref: () => Conta,
    required: true,
  })
  conta: Conta
}
