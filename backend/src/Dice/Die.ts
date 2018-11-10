import { Arg, Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class RandomDie {
  @Field(type => Int)
  sides: number;

  constructor(sides?: number) {
    this.sides = sides || 6;
  }

  @Field(type => [Int])
  rollDieNTimes(@Arg("rolls", type => Int) rolls: number): number[] {
    const results = [];
    for (let i = 0; i < rolls; i++) {
      results.push(Math.ceil(Math.random() * this.sides));
    }
    return results;
  }
}
