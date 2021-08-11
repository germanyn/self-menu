import { plugin, prop, Ref } from "@typegoose/typegoose";
import { Schema, Types } from "mongoose";
import mongooseDelete from 'mongoose-delete';
import { Field, ID, ObjectType } from "type-graphql";
import { Loja } from "../loja/Loja";

@plugin(mongooseDelete, {
  overrideMethods: true,
})
@ObjectType()
export class SolicitacaoDeGarcom {
  @Field(() => ID)
  _id: Types.ObjectId;

  @Field(() => Loja)
  @prop({
    ref: () => Loja,
    required: true,
  })
  loja: Ref<Loja>

  @Field(() => String, { nullable: true })
  @prop({ type: () => Schema.Types.String, default: null })
  mesa?: string | null;

  @Field(() => Boolean, { defaultValue: false })
  @prop({ default: false })
  lido: boolean

  @Field()
  criadoEm: Date

  @Field()
  atualizadoEm: Date

  deleteadoEm: Date
}
