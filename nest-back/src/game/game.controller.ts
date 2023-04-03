import { BadRequestException, Controller, Get, Query, UseGuards } from "@nestjs/common";
import JwtTwoFactorAuthGuard from "src/auth/two-factor-auth/jwt-two-factor-auth.guard";
import { UsersService } from "src/users/users.service";
import { GameService } from "./game.service";


@Controller('game')
export class GameController {
	constructor(
		private gameService: GameService,
		private usersService: UsersService
	) {}

	@Get()
	@UseGuards(JwtTwoFactorAuthGuard)
	async findmatchPage(
		@Query('startIndex') startIndex: number,
		@Query('pageSize') pageSize: number,
		@Query('username') username: string
	) {
		const user = await this.usersService.getByUsername(username);
		if (!user) {
			throw new BadRequestException();
		}
		const matches = await this.gameService.findMatches(startIndex, pageSize, user.id);
		return matches.map(({ scoreWinner, scoreLoser, createdAt, winner, loser }) => ({
			createdAt,
			result: winner.profile.id == user.id ? "win" : "lost",
			opponentScore: winner.profile.id == user.id ? scoreLoser : scoreWinner,
			userScore: winner.profile.id == user.id ? scoreWinner : scoreLoser,
			opponentAvatar: winner.profile.id == user.id ? loser.profile.avatar.url : winner.profile.avatar.url,
			opponentUsername: winner.profile.id == user.id ? loser.profile.username : winner.profile.username
		}))
	}
}