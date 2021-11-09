import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginResult } from './auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Query(() => LoginResult)
  public async login(@Args('data') input: LoginInput): Promise<LoginResult> {
    return this.authService.login(input);
  }
}
