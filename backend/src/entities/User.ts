import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Cat from "./Cat";

@ObjectType()
@Entity()
export default class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field(type => [Cat])
  @OneToMany(type => Cat, cat => cat.owner, { cascade: ["insert"] })
  cats: Cat[];
}
