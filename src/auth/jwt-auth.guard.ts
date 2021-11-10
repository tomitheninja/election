import {
  ExecutionContext,
  Injectable,
  createParamDecorator,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GqlExecutionContext } from '@nestjs/graphql';

export interface JwtUser {
  id: number;
}

export const Jwt = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
