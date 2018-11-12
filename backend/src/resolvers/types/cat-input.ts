import { Field, ID, InputType } from "type-graphql";
import Cat, { Size } from "../../entities/Cat";

@InputType()
export default class CatInput implements Partial<Cat> {
  @Field()
  name: string;

  @Field(type => Size)
  size: Size;

  @Field()
  personality: string;

  @Field(type => ID)
  ownerId: number;
}
