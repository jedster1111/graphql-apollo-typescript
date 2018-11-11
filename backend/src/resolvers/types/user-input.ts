import { Field, InputType } from "type-graphql";
import User from "../../entities/User";

@InputType()
export default class UserInput implements Partial<User> {
  @Field()
  name: string;
}
