import { prop, Ref } from "@typegoose/typegoose";
import { Conta } from "../conta/Conta";
import { Produto } from "../produto/Produto";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Categoria {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => String)
  @prop({ required: true })
  nome: string;

  @Field(() => Conta)
  @prop({
    ref: () => Conta,
    required: true,
  })
  conta: Ref<Conta>

  @Field(() => [Produto])
  @prop({
    ref: () => Produto,
    default: [],
  })
  produtos: Ref<Produto>[]
}
