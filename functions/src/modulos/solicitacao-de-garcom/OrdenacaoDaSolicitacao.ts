import { Ordenacao } from "../commons/Paginacao";
import { Field, InputType } from "type-graphql";

@InputType()
export class OrdenacaoDaSolicitacao {
    @Field(() => Ordenacao, { nullable: true })
    criadoEm?: Ordenacao
}