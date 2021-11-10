import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { Election } from './election.model';
import { ElectionService } from './election.service';
import { UserService } from '../user/user.service';
import { CreateElectionInput, FindAllElectionInput } from './election.dto';
import { Jwt, JwtUser, JwtGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Election)
export class ElectionResolver {
  constructor(
    private service: ElectionService,
    private userService: UserService
  ) {}

  @Mutation(() => Election)
  @UseGuards(JwtGuard)
  async createElection(
    @Args('data') data: CreateElectionInput,
    @Jwt() user: JwtUser
  ) {
    return this.service.create(data, user.id);
  }

  @Query(() => Election)
  async findById(@Args('id') id: number) {
    return this.service.findById(id);
  }

  @Query(() => [Election])
  async findElections(@Args('options') options: FindAllElectionInput) {
    return this.service.findAll(options);
  }

  @ResolveField()
  async organizer(@Parent() { organizer_id }: Election) {
    return this.userService.findById(organizer_id);
  }
}
