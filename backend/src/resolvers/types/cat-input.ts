import { Field, ID, InputType } from "type-graphql";
import Cat from "../../entities/Cat";

@InputType()
export default class CatInput implements Partial<Cat> {
  @Field()
  name: string;

  @Field()
  size: string;

  @Field()
  personality: string;

  @Field(type => ID)
  ownerId: number;
}
