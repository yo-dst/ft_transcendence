import { Controller, Get, Query } from "@nestjs/common";
import { GameService } from "./game.service";


@Controller('game')
export class GameController {
	constructor(
		private gameService: GameService
	) { }

	@Get()
	findmatchPage(@Query('startIndex') startIndex: number, @Query('pageSize') pageSize: number, @Query('email') email: string) {
		return this.gameService.findMatches(startIndex, pageSize, email);
	}
}