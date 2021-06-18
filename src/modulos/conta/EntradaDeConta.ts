import { InputType, Field } from "type-graphql";

@InputType()
export class EntradaDeConta {
  @Field({ nullable: false })
  restaurante: string;

  @Field({ nullable: false })
  nome: string;

  @Field({ nullable: false })
  login: string;

  @Field({ nullable: false })
  senha: string;
}
