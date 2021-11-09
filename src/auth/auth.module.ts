import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './jwt.strategy';

const secret = process.env['JWT_SECRET'] || 'secret';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({ secret, signOptions: { expiresIn: '1h' } }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
