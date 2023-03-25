import { Injectable } from "@nestjs/common";

@Injectable()
export class GameRoom {
	public id: string;
	public players: string[] = new Array(2);
	public spectators: string[] = [];
	public gameMode: number;
	public score: number[] = [0, 0];
	public ready: Boolean = true;
	public nbPlayerRdy: number = 0;


	constructor(id: string, gameMode: number, player1: string, player2: string) {
		this.id = id;
		this.gameMode = gameMode;
		this.players[0] = player1;
		this.players[1] = player2;
	}

	isPlayer(client: string) {
		return this.players.includes(client);
	}

	isSpecator(client: string) {
		return this.spectators.includes(client);
	}

	isPlayer1(client: string) {
		return this.players[0] == client;
	}

	isPlayer2(client: string) {
		return this.players[1] == client;
	}

}