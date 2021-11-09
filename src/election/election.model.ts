import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';

@ObjectType()
export class Election {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  start: Date;

  @Field({ nullable: true })
  end: Date;

  @Field()
  owner: User;
}
