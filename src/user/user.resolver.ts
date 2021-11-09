import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard, Jwt } from '../auth/jwt-auth.guard';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput) {
    return this.userService.create(data);
  }

  @Query(() => User)
  async userById(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Query(() => User)
  async me(@Jwt() { id }) {
    return this.userService.findById(id);
  }
}
