import { BadRequestException, Body, Controller, Get, Patch, Req, UseGuards } from "@nestjs/common";
import { RequestWithUser } from "src/auth/request-with-user.interface";
import JwtTwoFactorAuthGuard from "src/auth/two-factor-auth/jwt-two-factor-auth.guard";
import { UsersService } from "../users.service";
import RemoveFriendDto from "./dto/remove-friend.dto";
import UpdateAvatarDto from "./dto/update-avatar.dto";
import UpdateUsernameDto from "./dto/update-username.dto";

@Controller("user")
export class UserController {
	constructor(
		private usersService: UsersService
	) {}

	@Patch("username")
	@UseGuards(JwtTwoFactorAuthGuard)
	async updateUsername(
		@Req() req: RequestWithUser,
		@Body() { newUsername }: UpdateUsernameDto
	) {
		const user = await this.usersService.getByUsername(newUsername);
		if (user) {
			throw new BadRequestException('User with that username already exists');
		}
		return this.usersService.setUsername(req.user.id, newUsername);
	}

	@Patch("avatar")
	@UseGuards(JwtTwoFactorAuthGuard)
	async updateAvatar(
		@Req() req: RequestWithUser,
		@Body() { newAvatar }: UpdateAvatarDto
	) {
		return this.usersService.setAvatar(req.user.id, newAvatar);
	}

	@Patch("remove-friends")
	@UseGuards(JwtTwoFactorAuthGuard)
	async removeFriends(
		@Req() req: RequestWithUser, 
		@Body() { username }: RemoveFriendDto
	) {
		const friendToBeRemoved = await this.usersService.getByUsername(username);
		if (!friendToBeRemoved) {
			throw new BadRequestException("User with this username doesn't exist");
		}
		if (this.usersService.areFriends(req.user.id, friendToBeRemoved.id)) {
			throw new BadRequestException("You are not friend with this user");
		}
		await this.usersService.removeFriends(req.user.id, friendToBeRemoved.id);
	}

	@Get("friends")
	@UseGuards(JwtTwoFactorAuthGuard)
	async getFriends(@Req() req: RequestWithUser) {
		return this.usersService.getFriends(req.user.id);
	}

	@Get("friend-requests")
	@UseGuards(JwtTwoFactorAuthGuard)
	async getFriendRequests(@Req() req: RequestWithUser) {
		return this.usersService.getFriendRequestsReceived(req.user.id);
	}
}