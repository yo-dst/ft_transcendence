import { BadRequestException, Body, Controller, Get, Patch, Post, Req, UseGuards } from "@nestjs/common";
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
	) { }
	// returns what must be returned of user for frontend
	@Get()
	@UseGuards(JwtTwoFactorAuthGuard)
	async getUser(@Req() req: RequestWithUser) {
		const profile = await this.usersService.getProfile(req.user.id);
		return {
			profile,
			id: req.user.id
		}
	}

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

	@Patch("remove-friend")
	@UseGuards(JwtTwoFactorAuthGuard)
	async removeFriends(
		@Req() req: RequestWithUser,
		@Body() { username }: RemoveFriendDto
	) {
		const friendToBeRemoved = await this.usersService.getByUsername(username);
		if (!friendToBeRemoved) {
			throw new BadRequestException("User with this username doesn't exist");
		}
		if (!this.usersService.areFriends(req.user.id, friendToBeRemoved.id)) {
			throw new BadRequestException("You are not friend with this user");
		}
		await this.usersService.removeFriends(req.user.id, friendToBeRemoved.id);
	}

	@Get("friends")
	@UseGuards(JwtTwoFactorAuthGuard)
	async getFriends(@Req() req: RequestWithUser) {
		const friends = await this.usersService.getFriends(req.user.id);
		const friendsProfiles = [];
		for (let i = 0; i < friends.length; i++) {
			const friendProfile = await this.usersService.getProfile(friends[i].id);
			friendsProfiles.push(friendProfile);
		}
		return friendsProfiles;
	}

	@Get("friend-requests")
	@UseGuards(JwtTwoFactorAuthGuard)
	async getFriendRequests(@Req() req: RequestWithUser) {
		const friendRequests = await this.usersService.getFriendRequestsReceived(req.user.id);
		return Promise.all(friendRequests.map(async ({ id, creator, receiver }) => {
			const creatorProfile = await this.usersService.getProfile(creator.id);
			return {
				id: id,
				creator: creatorProfile
			}
		}));
	}

	@Get("profile")
	@UseGuards(JwtTwoFactorAuthGuard)
	async getProfile(@Req() req: RequestWithUser) {
		return this.usersService.getProfile(req.user.id);
	}
}