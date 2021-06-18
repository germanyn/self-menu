import { Entity, BaseEntity, Column, ObjectIdColumn, ManyToOne, ManyToMany, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Conta } from "../conta/Conta";

@Entity()
@ObjectType()
export class Usuario extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field(() => String)
  @Column()
  nome: string;

  @Field(() => String)
  @Column()
  login: string;

  @Column({ nullable: false, select: false })
  senha: string;

  @ManyToMany(() => Conta, conta => conta.usuarios)
  contas: Conta[]
}
