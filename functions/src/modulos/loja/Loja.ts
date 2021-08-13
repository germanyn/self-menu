import { prop, Ref } from "@typegoose/typegoose";
import { Usuario } from "../usuario/Usuario";
import { Schema, Types } from "mongoose";
import { Field, ID, ObjectType } from "type-graphql";
import { Endereco } from "../commons/Endereco";
import { Conta } from "../conta/Conta";
import { Categoria } from "../categoria/Categoria";

@ObjectType()
export class Loja {
  @Field(() => ID)
  _id: Types.ObjectId;

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
  conta: Ref<Conta>

  @prop({
    ref: () => Usuario,
    default: [],
  })
  editores: Ref<Usuario>[]

  @Field(() => String, { nullable: true })
  @prop({
    type: () => Schema.Types.String
  })
  banner: string | null;

  @Field(() => String, { nullable: true })
  @prop({
    type: () => Schema.Types.String
  })
  logo: string | null;

  @Field(() => [Categoria])
  @prop({
    ref: () => Categoria,
    default: [],
  })
  categorias: Ref<Categoria>[]

  @Field(() => String, { nullable: true })
  @prop({ type: () => Schema.Types.String })
  coresJson?: string | null
}
