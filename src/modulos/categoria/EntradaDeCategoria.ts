import { Field, InputType } from "type-graphql";

@InputType()
export class EntradaDeCategoria {
  @Field()
  nome: string;

  @Field({ nullable: true })
  lojaId: string;

}
