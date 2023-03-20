import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TwoFactorAuthService } from './twoFactorAuth/twoFactorAuth.service';
import { TwoFactorAuthController } from './twoFactorAuth/twoFactorAuth.controller';
import { JwtTwoFactorStrategy } from './twoFactorAuth/jwtTwoFactor.strategy';

@Module({
  imports: [
    UsersModule,
    HttpModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("JWT_SECRET"),
				signOptions: { expiresIn: `${configService.get("JWT_EXPIRATION_TIME")}s` }
      })
    })
  ],
  providers: [
    AuthService,
    JwtStrategy,
    TwoFactorAuthService,
    JwtTwoFactorStrategy
  ],
  controllers: [
    AuthController,
    TwoFactorAuthController
  ]
})
export class AuthModule {}
