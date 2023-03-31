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

	async save(score: number[], player: number[]) {
		const match = new Match();
		match.scoreWinner = Math.max(...score);
		match.scoreLoser = Math.min(...score);
		match.winner = score[0] > score[1] ? await this.usersService.getById(player[0]) : await this.usersService.getById(player[1]);
		match.loser = score[0] > score[1] ? await this.usersService.getById(player[1]) : await this.usersService.getById(player[0]);
		console.log(match.winner);
		console.log(match.loser);
		this.matchRepository.save(match);
	}

	async findMatches(pageNumber: number, pageSize: number, userId: number) {
		const matches = await this.matchRepository.find({
			relations: {
				winner: {
					profile: true
				},
				loser: {
					profile: true
				}
			},
			where: [{ winner: { id: userId } }, { loser: { id: userId } }],
			take: pageSize,
			skip: pageNumber,
			order: { id: "DESC" }
		})
		return matches;
	}

}