import { Field, InputType } from "type-graphql";

@InputType()
export class CriacaoDeCategoria {
  @Field()
  nome: string;

  @Field()
  lojaId: string;
}

@InputType()
export class EdicaoDeCategoria {
  @Field()
  nome: string;
}
