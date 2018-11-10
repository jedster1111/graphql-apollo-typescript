import { Arg, Mutation, Query, Resolver } from "type-graphql";
import databasePolls, { pollDb, StoredPoll } from "../database/polls";
import users from "../database/users";
import Poll from "./Poll";
import PollInput from "./PollInput";

@Resolver(of => Poll)
export default class PollResolver {
  @Query(returns => [Poll], { description: "Get all of the polls!" })
  allPolls(): Poll[] {
    const storedPolls = Object.values(databasePolls);
    const pollsWithUsers = storedPolls.reduce<Poll[]>((prev, storedPoll) => {
      const pollWithUser: Poll = getPollWithUser(storedPoll);
      prev.push(pollWithUser);
      return prev;
    }, []);
    return pollsWithUsers;
  }

  @Query(returns => Poll, { description: "Get a poll by id" })
  Poll(@Arg("id") id: string): Poll {
    return getPollWithUser(pollDb.findPoll(id));
  }

  @Mutation(returns => Poll)
  addPoll(@Arg("data") data: PollInput): Poll {
    const newPoll = pollDb.addPoll(data);
    return getPollWithUser(newPoll);
  }

  // @FieldResolver()
  // creator(@Root() poll: Poll, @Arg("creator")){

  // };
}

function getPollWithUser({ creatorId, ...rest }: StoredPoll): Poll {
  return { ...rest, creator: users[creatorId] };
}
