import { Field, ID, ObjectType } from "type-graphql";
import uuid = require("uuid/v1");
import User from "../User/User";

@ObjectType()
export default class Poll {
  @Field(type => ID)
  readonly id: string;
  @Field()
  title: string;
  @Field()
  description: string;
  @Field(type => User)
  creator: User;

  constructor(title: string, description: string, username: string) {
    this.id = uuid();
    this.title = title;
    this.description = description;
    this.creator = new User(username);
  }
}
