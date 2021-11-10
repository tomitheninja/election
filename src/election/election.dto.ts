import { Field, InputType } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { PaginationInput } from '../pagination.dto';

@InputType()
class ElectionTimeFilter {
  @Field({ defaultValue: true })
  includePast: boolean;

  @Field({ defaultValue: true })
  includeFuture: boolean;
}

export enum ElectionOrderBy {
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  START_ASC = 'NAME_ASC',
  START_DESC = 'NAME_DESC',
  END_ASC = 'END_ASC',
  END_DESC = 'END_DESC',
}

@InputType()
export class FindAllElectionInput extends PaginationInput {
  @Field({ defaultValue: ElectionOrderBy.NAME_ASC })
  order: ElectionOrderBy;

  @Field({ defaultValue: { includePast: true, includeFuture: true } })
  filter: ElectionTimeFilter;

  @Field({ nullable: true, defaultValue: null })
  organizerId: number;
}

@InputType()
export class CreateElectionInput {
  @Field()
  name: string;

  @Field({ defaultValue: '' })
  description: string;

  @Field({ nullable: true })
  start?: Date;

  @Field({ nullable: true })
  end?: Date;
}
