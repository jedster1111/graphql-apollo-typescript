import {
  Arg,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import Cat from "../entities/Cat";
import User from "../entities/User";
import UserInput from "./types/user-input";

@Resolver(of => User)
export default class UserResolver {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>
  ) {}

  @Query(returns => [User])
  users(): Promise<User[]> {
    return this.userRepository.find();
  }

  @Query(returns => User, { nullable: true })
  user(@Arg("id", type => ID) id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  @Mutation(returns => User)
  async addUser(@Arg("user") userInput: UserInput): Promise<User> {
    const user = this.userRepository.create({
      ...userInput
    });
    return await this.userRepository.save(user);
  }

  @FieldResolver()
  async cats(@Root() user: User): Promise<Cat[]> {
    return await this.catRepository.find({ where: { ownerId: user.id } });
  }
}
