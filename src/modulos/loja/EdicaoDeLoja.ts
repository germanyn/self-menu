import { InputType, Field } from "type-graphql"

@InputType()
export class EdicaoDeLoja {
  @Field({ nullable: false })
  nome: string;
}
