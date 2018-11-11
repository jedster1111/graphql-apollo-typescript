import { Field, InputType } from "type-graphql";

import Cat from "../../entities/Cat";

@InputType()
export default class CatInput implements Partial<Cat> {
  @Field()
  name: string;
}
