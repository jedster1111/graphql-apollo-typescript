import { Query, Resolver } from "type-graphql";
import databasePolls from "../database/polls";
import users from "../database/users";
import Poll from "./Poll";

@Resolver(of => Poll)
export default class PollResolver {
  @Query(returns => [Poll], { description: "Get all of the polls!" })
  polls(): Poll[] {
    const storedPolls = Object.values(databasePolls);
    const pollsWithUsers = storedPolls.reduce<Poll[]>(
      (prev, { creatorId, ...rest }) => {
        const pollWithUser: Poll = { ...rest, creator: users[creatorId] };
        prev.push(pollWithUser);
        return prev;
      },
      []
    );
    return pollsWithUsers;
  }
}
