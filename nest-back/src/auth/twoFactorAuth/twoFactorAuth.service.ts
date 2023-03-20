import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { authenticator } from 'otplib';
import User from "src/users/entities/user.entity";
import * as qrcode from "qrcode";

@Injectable()
export class TwoFactorAuthService {
	constructor(
		private usersService: UsersService
	) {}

	async generateTwoFactorAuthenticationSecret(user: User) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, 'AUTH_APP_NAME', secret);
    await this.usersService.setTwoFactorAuthenticationSecret(secret, user.id);
    return {
      otpauthUrl
    }
  }

	async generateQrCodeDataURL(otpAuthUrl: string): Promise<any> {
		return qrcode.toDataURL(otpAuthUrl, {
			width: 200,
			height: 200
		});
  }

	isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode: string, user: User): boolean {
    return authenticator.verify({
      token: twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret
    });
  }
}