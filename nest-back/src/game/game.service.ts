import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Match } from "./entity/match.entity";


@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Match) private matchRepository: Repository<Match>,
		private usersService: UsersService
	) { }

	async save(score: number[], player: string[]) {
		const match = new Match();
		match.scoreWinner = Math.max(...score);
		match.scoreLoser = Math.min(...score);
		match.winner = score[0] > score[1] ? await this.usersService.getByEmail(player[0]) : await this.usersService.getByEmail(player[1]);
		match.loser = score[0] > score[1] ? await this.usersService.getByEmail(player[1]) : await this.usersService.getByEmail(player[0]);
		this.matchRepository.save(match);
	}

	async findMatches(pageNumber: number, pageSize: number, userEmail: string) {
		const matches = await this.matchRepository.findAndCount({
			where: [{ winner: { email: userEmail } }, { loser: { email: userEmail } }],
			take: pageSize,
			skip: pageNumber,
			order: { id: "DESC" }
		})
		return matches;
	}

}