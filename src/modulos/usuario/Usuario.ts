import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Conta } from "../conta/Conta";

@ObjectType()
export class Usuario {
  @Field(() => ID)
  _id: Types.ObjectId

  @Field()
  @prop({ required: true })
  nome: string;

  @Field({ nullable: true })
  @prop()
  login?: string;

  @Field({ nullable: true })
  @prop({ unique: true })
  email?: string;

  @prop({
    select: false,
    required: true,
  })
  senha: string;

  @Field(() => Conta)
  @prop({ ref: () => Conta })
  contas: Ref<Conta>[]
}
