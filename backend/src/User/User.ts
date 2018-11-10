import { Field, ID, ObjectType } from "type-graphql";
import uuid = require("uuid/v4");

@ObjectType()
export default class User {
  @Field(type => ID)
  readonly id: string;

  @Field()
  name: string;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }
}
