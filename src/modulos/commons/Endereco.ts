import { BaseEntity, Column, ObjectIdColumn } from "typeorm";
import { ObjectType, Field, Int, InputType } from "type-graphql";

@InputType('EntradaDeEndereco')
@ObjectType()
export class Endereco extends BaseEntity {
  @Field(() => String)
  @Column()
  rua: string;

  @Field(() => Int)
  @Column()
  numero: number;

  @Field(() => String)
  @Column()
  cep: string;

  @Field(() => String)
  @Column()
  cidade: string;

  @Field(() => String)
  @Column()
  uf: string;

  @Field(() => String, {
      nullable: true
  })
  @Column({ nullable: true })
  complemento: string | null;
}
