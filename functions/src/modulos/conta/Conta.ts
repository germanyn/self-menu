import { ObjectType, Field, ID } from "type-graphql";
import { Usuario } from "../usuario/Usuario";
import { Loja } from "../loja/Loja";
import { prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";

@ObjectType()
export class Conta {
  @Field(() => ID)
  _id: Types.ObjectId

  @Field(() => String)
  @prop({ required: true })
  nome: string;

  @Field(() => Usuario)
  @prop({
    ref: () => Usuario,
    required: true,
  })
  dono: Ref<Usuario>;
  
  @Field(() => [Loja])
  @prop({
    ref: () => Loja,
    required: true,
  })
  lojas: Ref<Loja>[]
}
