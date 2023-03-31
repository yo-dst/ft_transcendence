import { Controller, Get, Query } from "@nestjs/common";
import { GameService } from "./game.service";


@Controller('game')
export class GameController {
	constructor(
		private gameService: GameService
	) { }

	@Get()
	async findmatchPage(@Query('startIndex') startIndex: number, @Query('pageSize') pageSize: number, @Query('id') id: number) {
		const matches = await this.gameService.findMatches(startIndex, pageSize, id);
		return matches.map(({ scoreWinner, scoreLoser, createdAt, winner, loser }) => ({
			createdAt,
			result: winner.profile.id == id ? "win" : "lost",
			opponentScore: winner.profile.id == id ? scoreLoser : scoreWinner,
			userScore: winner.profile.id == id ? scoreWinner : scoreLoser,
			opponentAvatar: winner.profile.id == id ? loser.profile.avatar.url : winner.profile.avatar.url,
			opponentUsername: winner.profile.id == id ? loser.profile.username : winner.profile.username
		}))
	}
}