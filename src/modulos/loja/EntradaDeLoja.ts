import { InputType, Field } from "type-graphql";
import { Endereco } from "../commons/Endereco";

@InputType()
export class EntradaDeLoja {
  @Field({ nullable: false })
  nome: string;

  @Field({ nullable: false })
  contaId: string

  @Field({ nullable: true })
  cnpj?: string;

  @Field(() => Endereco, { nullable: true })
  endereco?: Endereco;

}
