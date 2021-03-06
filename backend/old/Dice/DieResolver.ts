import { Arg, Int, Query, Resolver } from "type-graphql";
import Die from "./Die";

@Resolver()
export default class RandomDieResolver {
  @Query(returns => Die)
  getDie(@Arg("sides", type => Int, { nullable: true }) sides?: number): Die {
    return new Die(sides);
  }
}
