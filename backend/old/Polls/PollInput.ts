import { Field, InputType } from "type-graphql";
import Poll from "./Poll";

@InputType()
export default class PollInput implements Partial<Poll> {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  creatorId: string;

  constructor(title: string, description: string, creatorId: string) {
    this.title = title;
    this.description = description;
    this.creatorId = creatorId;
  }
}
