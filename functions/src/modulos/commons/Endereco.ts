import { prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";
import { ObjectType, Field, Int, InputType } from "type-graphql";

@InputType('EntradaDeEndereco')
@ObjectType()
export class Endereco {
  @Field(() => String)
  @prop({ required: true })
  rua: string;

  @Field(() => Int)
  @prop({ required: true })
  numero: number;

  @Field(() => String)
  @prop({ required: true })
  cep: string;

  @Field(() => String)
  @prop({ required: true })
  cidade: string;

  @Field(() => String)
  @prop({ required: true })
  bairro: string;

  @Field(() => String)
  @prop({ required: true })
  uf: string;

  @Field(() => String, {
      nullable: true,
  })
  @prop({
    type: () => Schema.Types.String,
  })
  complemento: string | null
}
