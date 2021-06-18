import { Entity, BaseEntity, Column, ObjectIdColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";
import { Conta } from "../conta/Conta";

@Entity()
@ObjectType()
export class Produto extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field(() => String)
  @Column()
  nome: string;

  @Field(() => Float)
  @Column('float')
  preco: number;

  @Field(() => Conta)
  @ManyToOne(() => Conta)
  conta: Promise<Conta>
}
