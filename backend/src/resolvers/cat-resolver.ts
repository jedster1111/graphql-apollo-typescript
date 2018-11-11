import {
  Arg,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root
} from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Repository } from "typeorm";
import Cat from "../entities/Cat";
import User from "../entities/User";
import CatInput from "./types/cat-input";

@Resolver(of => Cat)
export default class CatResolver {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  @Query(returns => [Cat])
  cats(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  @Query(returns => Cat, { nullable: true })
  cat(@Arg("id", type => ID) id: number): Promise<Cat | undefined> {
    return this.catRepository.findOne(id);
  }

  @Mutation(returns => Cat)
  async addCat(@Arg("cat") catInput: CatInput): Promise<Cat> {
    const cat = this.catRepository.create({
      ...catInput
    });
    return await this.catRepository.save(cat);
  }

  @FieldResolver()
  async owner(@Root() cat: Cat): Promise<User | undefined> {
    return await this.userRepository.findOne(cat.ownerId);
  }
}
