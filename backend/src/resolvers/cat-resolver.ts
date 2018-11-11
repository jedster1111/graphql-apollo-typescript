import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Repository } from "typeorm";
import Cat from "../entities/Cat";
import CatInput from "./types/cat-input";

@Resolver(of => Cat)
export default class CatResolver {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>
  ) {}

  @Query(returns => [Cat])
  cats(): Promise<Cat[]> {
    return this.catRepository.find();
  }

  @Mutation(returns => Cat)
  async addCat(@Arg("cat") catInput: CatInput): Promise<Cat> {
    const cat = this.catRepository.create({
      ...catInput
    });
    return await this.catRepository.save(cat);
  }
}
