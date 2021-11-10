import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { ElectionModule } from './election/election.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: './schema.graphql',
    }),
    UserModule,
    ElectionModule,
    AuthModule,
  ],
})
export class AppModule {}
