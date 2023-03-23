import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PostgresErrorCode } from 'src/database/postgresErrorCode.enum';
import User from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import TokenPayload from './tokenPayload.interface';

/*
	notes
	- what does happen when intra api throws an error?
*/

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private httpService: HttpService,
		private jwtService: JwtService,
		private configService: ConfigService
	) { }

	async getAccessToken42(code: string): Promise<string> {
		const res = await this.httpService.axiosRef.post("https://api.intra.42.fr/oauth/token", {
			grant_type: "authorization_code",
			client_id: "u-s4t2ud-7470221ce45a9a6950c2b7324e6e5a9a069460af572ce5daa2a0fb547a3d5fda",
			client_secret: "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",
			code: code,
			redirect_uri: "http://localhost:3000/auth/login"
		});
		return res.data?.access_token;
	}

	async getAccessToken42Info(accessToken42: string): Promise<any> {
		const res = await this.httpService.axiosRef.get("https://api.intra.42.fr/oauth/token/info", {
			headers: {
				Authorization: `Bearer ${accessToken42}`
			}
		});
		return res.data;
	}

	async getUser42Info(accessToken42: string): Promise<any> {
		const res = await this.httpService.axiosRef.get("https://api.intra.42.fr/v2/me", {
			headers: {
				Authorization: `Bearer ${accessToken42}`
			}
		});
		return res.data;
	}

	// try to throw outside service
	async register(user42: any): Promise<User> {
		const { email, login, ...rest } = user42;
		try {
			const newUser = await this.usersService.create({
				email: email,
				username: login
			});
			return newUser;
		} catch (error) {
			if (error?.code === PostgresErrorCode.UniqueViolation) {
				throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
			}
			throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	getCookieWithJwtAccessToken(userId: number, isTwoFactorAuthenticated = false) {
		const payload: TokenPayload = {
			userId,
			isTwoFactorAuthenticated
		};
		const token = this.jwtService.sign(payload);
		return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
	}

	getCookieForLogOut() {
		return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
	}
}
