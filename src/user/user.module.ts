import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [PassportModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
