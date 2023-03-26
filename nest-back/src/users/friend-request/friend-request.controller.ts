import { BadRequestException, Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Req, UseGuards } from "@nestjs/common";
import RequestWithUser from "src/auth/requestWithUser.interface";
import JwtTwoFactorAuthGuard from "src/auth/twoFactorAuth/jwtTwoFactorAuth.guard";
import { UsersService } from "../users.service";
import CreateFriendRequestDto from "./dto/create-friend-request.dto";
import { FriendRequestsService } from "./friend-request.service";

@Controller("friend-request")
export class FriendRequestController {
	constructor(
		private friendRequestService: FriendRequestsService,
		private usersService: UsersService
	) {}

	@Get()
	async getAll() {
		return this.friendRequestService.getAll();
	}

	@Post()
	@UseGuards(JwtTwoFactorAuthGuard)
	async send(
		@Req() req: RequestWithUser,
		@Body() { username }: CreateFriendRequestDto
	) {
		const creator = req.user;
		const receiver = await this.usersService.getByUsername(username);
		if (!receiver) {
			throw new BadRequestException("User with that username doesn't exist");
		}
		if (creator.friends.find(friend => friend.id === receiver.id)) {
			throw new BadRequestException("You are already friend with this user");
		}
		const friendRequest = await this.friendRequestService.getOneBy({ creator, receiver });
		if (friendRequest) {
			throw new BadRequestException("Friend request already exists");
		}
		return this.friendRequestService.create(creator, receiver)
	}

	@Post("accept/:id")
	@UseGuards(JwtTwoFactorAuthGuard)
	async accept(
		@Param("id", ParseIntPipe) id: number,
		@Req() req: RequestWithUser,
	) {
		const friendRequestToBeAccepted = await this.friendRequestService.getById(id);
		if (!friendRequestToBeAccepted) {
			throw new BadRequestException("Friend request with that id doesn't exist");
		}
		if (req.user.id !== friendRequestToBeAccepted.receiver.id) {
			throw new BadRequestException("You can't accept someone's else friend request");
		}
		await this.usersService.addFriend(friendRequestToBeAccepted.receiver, friendRequestToBeAccepted.creator);
		return this.friendRequestService.remove(friendRequestToBeAccepted);
	}

	@Post("decline/:id")
	@UseGuards(JwtTwoFactorAuthGuard)
	async decline(
		@Param("id", ParseIntPipe) id: number,
		@Req() req: RequestWithUser
	) {
		const friendRequestToBeRemoved = await this.friendRequestService.getById(id);
		if (!friendRequestToBeRemoved) {
			throw new BadRequestException("Friend request with that id doesn't exist");
		}
		if (req.user.id !== friendRequestToBeRemoved.receiver.id) {
			throw new BadRequestException("You can't decline someone's else friend request");
		}
		return this.friendRequestService.remove(friendRequestToBeRemoved);
	}
}