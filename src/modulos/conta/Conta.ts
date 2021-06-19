import { ObjectType, Field, ID } from "type-graphql";
import { Usuario } from "../usuario/Usuario";
import { Loja } from "../loja/Loja";
import { getModelForClass, prop, Ref } from "@typegoose/typegoose";

@ObjectType()
export class Conta {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  nome: string;

  @Field(() => Usuario)
  @prop({
    ref: () => Usuario,
    required: true,
  })
  dono: Usuario;

  @Field(() => [Loja])
  @prop({
    ref: () => Loja,
    required: true,
  })
  lojas: Loja[]
}
