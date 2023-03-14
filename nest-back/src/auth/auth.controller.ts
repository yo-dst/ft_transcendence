import { Controller, Get, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import JwtAuthGuard from './jwtAuth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	// for testing purpose
	@Get()
	@UseGuards(JwtAuthGuard)
	authenticate(@Req() req: RequestWithUser) {
		return req.user;
	}

	// callback endpoint to be supplied to 42 intra app page
	@Get("access-token-42")
	@Redirect()
	async get42AccessToken(@Query("code") code: string) {
		const accessToken42 = await this.authService.getAccessToken42(code);
    return {
      url: `http://localhost:3000/auth/login?token=${accessToken42}`,
      statusCode: 302
    };
	}

	@Get("login")
	@Redirect()
	async login(@Query("token") accessToken42: string, @Res({ passthrough: true }) res: Response) {
		const token = await this.authService.login(accessToken42);
		const cookie = this.authService.getCookieWithToken(token);
		res.setHeader("Set-Cookie", cookie);
    return {
      url: "http://localhost:5173",
      statusCode: 302
    };
  }

	@Get("logout")
	@UseGuards(JwtAuthGuard)
	@Redirect()
	logout(@Res({ passthrough: true }) res: Response) {
		const cookie = this.authService.getCookieForLogOut();
		res.setHeader("Set-Cookie", cookie);
		return {
      url: "http://localhost:5173",
      statusCode: 302
    };
	}
}
