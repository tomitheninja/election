import { Resolver, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Election } from './election.model';
import { ElectionService } from './election.service';
import { User } from '../user/user.model';
import { UserService } from '../user/user.service';

@Resolver(() => Election)
export class ElectionResolver {
  constructor(
    private service: ElectionService,
    private userService: UserService
  ) {}

  @Query(() => Election)
  async findById(@Args('id') id: number) {
    return this.service.findById(id);
  }

  @ResolveField()
  async owner(@Parent() owner: User) {
    return this.userService.findById(owner.id);
  }
}
