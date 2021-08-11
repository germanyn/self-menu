import { Field, InputType } from "type-graphql";

@InputType()
export class CriacaoDeSolicitacaoDeGarcom {
  @Field()
  idRestaurante: string;

  @Field({ nullable: true })
  mesa?: string;
}
