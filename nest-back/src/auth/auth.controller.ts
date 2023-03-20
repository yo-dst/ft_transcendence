import { Controller, Get, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import JwtAuthGuard from './jwtAuth.guard';
import RequestWithUser from './requestWithUser.interface';
import JwtTwoFactorAuthGuard from './twoFactorAuth/jwtTwoFactorAuth.guard';

/*
	notes
*/

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private usersService: UsersService
	) {}

	@Get()
	@UseGuards(JwtAuthGuard)
	authenticate(@Req() req: RequestWithUser) {
		return req.user;
	}

	// callback endpoint to be supplied to 42 intra app page
	@Get("login")
	@Redirect()
	async login(@Query("code") code: string, @Res({ passthrough: true }) res: Response) {
		const accessToken42 = await this.authService.getAccessToken42(code);
		const user42 = await this.authService.getUser42Info(accessToken42);
		let user = await this.usersService.getByEmail(user42?.email);
		if (!user) {
			user = await this.authService.register(user42);
		}
		const cookie = this.authService.getCookieWithJwtAccessToken(user.id);
		res.setHeader("Set-Cookie", cookie);
    return {
      url: "http://localhost:5173",
      statusCode: 302
    };
  }

	@Get("logout")
	@UseGuards(JwtTwoFactorAuthGuard)
	logout(@Res({ passthrough: true }) res: Response) {
		const cookie = this.authService.getCookieForLogOut();
		res.setHeader("Set-Cookie", cookie);
	}
}
