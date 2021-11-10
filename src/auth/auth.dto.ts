import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';
import { User } from '../user/user.model';

@InputType()
export class LoginInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  password: string;
}

@ObjectType()
export class LoginResult {
  @Field()
  access_token: string;
}

export interface JwtPayload {
  u: User['id'];
  iat?: number;
  exp?: number;
}
