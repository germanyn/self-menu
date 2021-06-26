import { InputType, Field, Float } from "type-graphql";

@InputType()
export class EntradaDeProduto {

  @Field({ nullable: false })
  contaId: string;

  @Field({ nullable: true })
  categoriaId?: string;

  @Field()
  nome: string;

  @Field({ nullable: true })
  descricao?: string;

  @Field(() => Float, { nullable: true })
  preco?: number;
}
