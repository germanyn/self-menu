import { prop, Ref } from "@typegoose/typegoose";
import { Categoria } from "../categoria/Categoria";
import { Types } from "mongoose";
import { Field, Float, ID, ObjectType } from "type-graphql";
import { Conta } from "../conta/Conta";

@ObjectType()
export class Produto {
  @Field(() => ID)
  _id: Types.ObjectId

  @Field()
  @prop({ required: true })
  nome: string;

  @Field({ nullable: true })
  @prop()
  descricao?: string;

  @Field(() => Float, { nullable: true })
  @prop()
  preco?: number;

  @Field({ nullable: true })
  @prop()
  urlDoPrato?: string;

  @Field(() => Conta)
  @prop({
    ref: () => Conta,
    required: true,
  })
  conta: Ref<Conta>

  @Field(() => Categoria, { nullable: true })
  @prop({
    ref: () => Categoria,
    required: false,
  })
  categoria?: Ref<Categoria>
}
