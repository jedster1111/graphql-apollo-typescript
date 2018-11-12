import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

export enum Size {
  Small = "Small",
  Medium = "Medium",
  Large = "Large"
}

registerEnumType(Size, {
  name: "Size"
});

@ObjectType()
@Entity()
export default class Cat {
  @Field(type => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  name: string;

  @Field(type => Size)
  @Column({ type: "enum", enum: Size })
  size: Size;

  @Field()
  @Column()
  personality: string;

  @Field(type => User)
  @ManyToOne(type => User, user => user.cats)
  owner: User;

  @Column({ nullable: true })
  ownerId: number;
}
