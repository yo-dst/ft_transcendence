import { Body, Controller, ForbiddenException, Get, HttpException, HttpStatus, Param, ParseIntPipe, Patch, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtTwoFactorAuthGuard from 'src/auth/twoFactorAuth/jwtTwoFactorAuth.guard';
import UpdateUsernameDto from './dto/updateUsername.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.getAll();
	}

	@Patch(":id/username")
	@UseGuards(JwtTwoFactorAuthGuard)
	async updateUsername(
		@Param("id", ParseIntPipe) id: number,
		@Req() req: RequestWithUser,
		@Body() { newUsername }: UpdateUsernameDto
	) {
		if (req.user.id !== id) {
			throw new ForbiddenException();
		}
		const user = await this.usersService.getByUsername(newUsername);
		if (user) {
			throw new HttpException('User with that username already exists', HttpStatus.BAD_REQUEST);
		}
		await this.usersService.setUsername(newUsername, id);
	}
}
