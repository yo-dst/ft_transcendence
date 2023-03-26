
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import TokenPayload from '../tokenPayload.interface';
import { UsersService } from 'src/users/users.service';
 
@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(Strategy, "jwtTwoFactor") {
  constructor(
    private configService: ConfigService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
        return request?.cookies?.Authentication;
      }]),
      secretOrKey: configService.get('JWT_SECRET')
    });
  }
 
  async validate(payload: TokenPayload) {
    const user = await this.userService.getById(payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!user.isTwoFactorAuthenticationEnabled) {
      return user;
    }
		if (payload.isTwoFactorAuthenticated) {
			return user;
		}
    throw new UnauthorizedException();
  }
}
