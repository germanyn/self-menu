import { Entity, BaseEntity, Column, ObjectIdColumn, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Conta } from "../conta/Conta";
import { Endereco } from "../commons/Endereco";

@Entity()
@ObjectType()
export class Loja extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field(() => String)
  @Column()
  nome: string;

  @Field(() => String, { nullable: true })
  @Column('varchar')
  cnpj: string | null;

  @Field(() => Endereco, { nullable: true })
  @Column()
  enereco: Endereco | null

  @Field(() => Conta)
  @ManyToOne(() => Conta, conta => conta.lojas, {
    nullable: false,
  })
  conta: Promise<Conta>
}
