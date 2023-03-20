import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { UsersService } from "src/users/users.service";
import { AuthService } from "../auth.service";
import JwtAuthGuard from "../jwtAuth.guard";
import RequestWithUser from "../requestWithUser.interface";
import TwoFactorAuthCodeDto from "./dto/twoFactorAuthCode.dto";
import JwtTwoFactorAuthGuard from "./jwtTwoFactorAuth.guard";
import { TwoFactorAuthService } from "./twoFactorAuth.service";

@Controller("2fa")
export class TwoFactorAuthController {
	constructor(
		private twoFactorAuthService: TwoFactorAuthService,
		private usersService: UsersService,
		private authService: AuthService
	) {}

	@Get()
	@UseGuards(JwtTwoFactorAuthGuard)
	authenticate(@Req() req: RequestWithUser) {
		return req.user;
	}

	@Post("generate")
	@UseGuards(JwtAuthGuard)
  async register(@Req() request: RequestWithUser) {
    const { otpauthUrl } = await this.twoFactorAuthService.generateTwoFactorAuthenticationSecret(request.user);
    return this.twoFactorAuthService.generateQrCodeDataURL(otpauthUrl);
  }

	@Post("turn-on")
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	async turnOnTwoFactorAuthentication(
		@Req() req: RequestWithUser,
		@Body() { twoFactorAuthenticationCode }: TwoFactorAuthCodeDto
	) {
		const isCodeValid = this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, req.user);
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		await this.usersService.turnOnTwoFactorAuthentication(req.user.id);
	}

	@Post("login")
	@UseGuards(JwtAuthGuard)
	@HttpCode(200)
	async loginWith2fa(
		@Req() req: RequestWithUser,
		@Res({ passthrough: true }) res: Response,
		@Body() { twoFactorAuthenticationCode }: TwoFactorAuthCodeDto
	) {
		const isCodeValid = this.twoFactorAuthService.isTwoFactorAuthenticationCodeValid(twoFactorAuthenticationCode, req.user);
		if (!isCodeValid) {
			throw new UnauthorizedException("Wrong authentication code");
		}
		const cookie = this.authService.getCookieWithJwtAccessToken(req.user.id, true);
		res.setHeader("Set-Cookie", cookie);
	}
}