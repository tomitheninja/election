import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ElectionFilter {
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
export class FindAllElectionInput {
  @Field({ defaultValue: 0 })
  start: number;

  @Field({ defaultValue: 50 })
  many: number;

  @Field({ defaultValue: ElectionOrderBy.NAME_ASC })
  order: ElectionOrderBy;

  @Field()
  filter: ElectionFilter;
}
