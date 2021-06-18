import { InputType, Field, Float } from "type-graphql";

@InputType()
export class EntradaDeProduto {

  @Field({ nullable: false })
  nome: string;

  @Field(() => Float)
  preco: number;
}
