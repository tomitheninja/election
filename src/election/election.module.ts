import { Module } from '@nestjs/common';
import { ElectionService } from './election.service';
import { ElectionResolver } from './election.resolver';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [ElectionService, ElectionResolver],
})
export class ElectionModule {}
