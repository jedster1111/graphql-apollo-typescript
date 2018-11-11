import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@ObjectType()
@Entity()
export default class Cat {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  size: string;

  @Field()
  @Column()
  personality: string;

  @Field(type => User)
  @ManyToOne(type => User)
  owner: User;

  @Column({ nullable: true })
  ownerId: number;
}
