import { Entity, BaseEntity, Column, ObjectIdColumn, ManyToMany, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Usuario } from "../usuario/Usuario";
import { Loja } from "../loja/Loja";

@Entity()
@ObjectType()
export class Conta extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: string;

  @Field(() => String)
  @Column()
  nome: string;

  @Field(() => Usuario)
  @Column()
  dono: Usuario;

  @Field(() => [Usuario])
  @ManyToMany(() => Usuario, usuario => usuario.contas, {
    cascade: ['insert']
  })
  usuarios: Usuario[];

  @Field(() => [Loja])
  @OneToMany(() => Loja, loja => loja.conta, {
    cascade: true,
  })
  lojas: Promise<Loja[]> = Promise.resolve([])
}
