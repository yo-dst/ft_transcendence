import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import { RequestWithUser } from "src/auth/request-with-user.interface";
import JwtTwoFactorAuthGuard from "src/auth/two-factor-auth/jwt-two-factor-auth.guard";
import { UsersService } from "../users.service";
import CreateFriendRequestDto from "./dto/create-friend-request.dto";
import { FriendRequestsService } from "./friend-requests.service";

/*
	notes
		- remove sensitive returns
*/

@Controller("friend-request")
export class FriendRequestsController {
	constructor(
		private friendRequestsService: FriendRequestsService,
		private usersService: UsersService
	) {}

	@Get()
	async getAll() {
		return this.friendRequestsService.getAll();
	}

	@Post()
	@UseGuards(JwtTwoFactorAuthGuard)
	async send(
		@Req() req: RequestWithUser,
		@Body() { username }: CreateFriendRequestDto
	) {
		const creator = await this.usersService.getById(req.user.id);
		const receiver = await this.usersService.getByUsername(username);
		if (!receiver) {
			throw new BadRequestException("User with that username doesn't exist");
		}
		if (!this.usersService.areFriends(creator.id, receiver.id)) {
			throw new BadRequestException("You are already friend with this user");
		}
		const friendRequest = await this.friendRequestsService.getOneBy({ creator, receiver });
		if (friendRequest) {
			throw new BadRequestException("Friend request already exists");
		}
		return this.friendRequestsService.create(creator, receiver)
	}

	@Post("accept/:id")
	@UseGuards(JwtTwoFactorAuthGuard)
	async accept(
		@Req() req: RequestWithUser,
		@Param("id", ParseIntPipe) id: number
	) {
		const friendRequestToBeAccepted = await this.friendRequestsService.getById(id);
		if (!friendRequestToBeAccepted) {
			throw new BadRequestException("Friend request with that id doesn't exist");
		}
		if (req.user.id !== friendRequestToBeAccepted.receiver.id) {
			throw new BadRequestException("You can't accept someone's else friend request");
		}
		await this.usersService.makeFriends(friendRequestToBeAccepted.receiver.id, friendRequestToBeAccepted.creator.id);
		return this.friendRequestsService.remove(friendRequestToBeAccepted);
	}

	@Post("decline/:id")
	@UseGuards(JwtTwoFactorAuthGuard)
	async decline(
		@Req() req: RequestWithUser,
		@Param("id", ParseIntPipe) id: number
	) {
		const friendRequestToBeRemoved = await this.friendRequestsService.getById(id);
		if (!friendRequestToBeRemoved) {
			throw new BadRequestException("Friend request with that id doesn't exist");
		}
		if (req.user.id !== friendRequestToBeRemoved.receiver.id) {
			throw new BadRequestException("You can't decline someone's else friend request");
		}
		return this.friendRequestsService.remove(friendRequestToBeRemoved);
	}
}