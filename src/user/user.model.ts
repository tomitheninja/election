import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;
}

@ObjectType()
export class UserWithCreds extends User {
  password: string;

  @Field()
  email: string;

  @Field()
  birth: Date;
}
