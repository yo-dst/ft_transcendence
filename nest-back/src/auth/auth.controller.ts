import { Controller, Get, HttpException, HttpStatus, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { PostgresErrorCode } from 'src/database/postges-error-code';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import JwtAuthGuard from './jwt-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import JwtTwoFactorAuthGuard from './two-factor-auth/jwt-two-factor-auth.guard';

/*
	notes
*/

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private usersService: UsersService
	) { }

	// retrieve sensitive data
	@Get()
	@UseGuards(JwtTwoFactorAuthGuard)
	authenticate(@Req() req: RequestWithUser) {
		const user = this.usersService.getBy({
			relations: {
				profile: true,
				friends: {
					profile: true
				},
				friendRequestsCreated: true,
				friendRequestsReceived: true
			},
			where: { id: req.user.id }
		});
		return user;
	}

	// callback endpoint to be supplied to 42 intra app page
	@Get("login")
	@Redirect()
	async login(
		@Res({ passthrough: true }) res: Response,
		@Query("code") code: string
	) {
		const accessToken42 = await this.authService.getAccessToken42(code);
		const user42 = await this.authService.getUser42Info(accessToken42);
		let user = await this.usersService.getByEmail(user42.email);
		if (!user) {
			try {
				user = await this.authService.register(user42);
			} catch (error) {
				if (error.code === PostgresErrorCode.UniqueViolation) {
					throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
				}
				// we might log this error
				throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		const cookie = this.authService.getCookieWithJwtAccessToken(user.id);
		res.setHeader("Set-Cookie", cookie);
		return {
			url: user.isTwoFactorAuthenticationEnabled ? "http://localhost:5173/2fa/verify" : "http://localhost:5173",
			statusCode: 302
		};
	}

	@Get("fakeUser")
	async fakeUser() {
		return { id: "4325325", state: 1, email: "email@mossad-co.il", username: "larry silverstein" }
	}

	@Get("logout")
	@UseGuards(JwtTwoFactorAuthGuard)
	logout(@Res({ passthrough: true }) res: Response) {
		const cookie = this.authService.getCookieForLogOut();
		res.setHeader("Set-Cookie", cookie);
	}
}
