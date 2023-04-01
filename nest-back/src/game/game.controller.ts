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
			result: winner.profile.id == id ? "won" : "lost",
			opponentScore: winner.profile.id == id ? scoreLoser : scoreWinner,
			userScore: winner.profile.id == id ? scoreWinner : scoreLoser,
			opponentProfile: winner.profile.id == id ? { avatar: { url: loser.profile.avatar.url }, username: loser.profile.username } : { avatar: { url: winner.profile.avatar.url }, username: winner.profile.username } 
		}))
	}
}