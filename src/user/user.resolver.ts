import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User, UserWithCreds } from './user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard, Jwt, JwtUser } from '../auth/jwt-auth.guard';
import { PaginationInput } from 'src/pagination.dto';

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
  @Query(() => UserWithCreds)
  async me(@Jwt() { id }: JwtUser) {
    return this.userService.findById(id);
  }

  @Query(() => [User])
  async listUsers(@Args('pagination') pagination: PaginationInput) {
    return this.userService.listAll(pagination);
  }
}
