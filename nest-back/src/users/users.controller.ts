import { BadRequestException, Body, Controller, Delete, ForbiddenException, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import RequestWithUser from 'src/auth/requestWithUser.interface';
import JwtTwoFactorAuthGuard from 'src/auth/twoFactorAuth/jwtTwoFactorAuth.guard';
import RemoveFriendDto from './dto/remove-friend.dto';
import UpdateAvatarDto from './dto/update-avatar.dto';
import UpdateUsernameDto from './dto/update-username.dto';
import { UsersService } from './users.service';

var count = 0;

@Controller('users')
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.getAll();
	}

	@Post("fake")
	addFakeUser() {
		const fakeUser = {
			email: `test${count}@gmail.com`,
			username: `test${count}`,
			avatarUrl: "https://picsum.photos/200"
		};
		count++;
		return this.usersService.create(fakeUser);
	}

	@Delete(":id")
	remove(@Param("id", ParseIntPipe) id: number) {
		return this.usersService.remove(id);
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
			throw new BadRequestException('User with that username already exists');
		}
		await this.usersService.setUsername(newUsername, id);
	}

	@Patch(":id/avatar")
	@UseGuards(JwtTwoFactorAuthGuard)
	async updateAvatar(
		@Param("id", ParseIntPipe) id: number,
		@Req() req: RequestWithUser,
		@Body() { newAvatar }: UpdateAvatarDto
	) {
		if (req.user.id !== id) {
			throw new ForbiddenException();
		}
		await this.usersService.setAvatar(newAvatar, id);
	}

	@Patch(":id/remove-friend")
	@UseGuards(JwtTwoFactorAuthGuard)
	async removeFriend(
		@Param("id", ParseIntPipe) id: number,
		@Req() req: RequestWithUser, 
		@Body() { username }: RemoveFriendDto
	) {
		if (req.user.id !== id) {
			throw new ForbiddenException();
		}
		const friendToBeRemoved = await this.usersService.getByUsername(username, ["friends"]);
		if (!friendToBeRemoved) {
			throw new BadRequestException("User with this username doesn't exist");
		}
		if (!friendToBeRemoved.friends.find(friend => req.user.id === friend.id)) {
			throw new BadRequestException("You are not friend with this user");
		}
		await this.usersService.removeFriend(req.user, friendToBeRemoved);
	}
}
