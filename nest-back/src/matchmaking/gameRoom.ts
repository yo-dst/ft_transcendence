import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class GameRoom {
	public id: string;
	public players: Socket[] = new Array(2);
	public spectators: Socket[] = [];
	public gameMode: number;

	constructor(id: string, gameMode: number, player1: Socket, player2: Socket) {
		this.id = id;
		this.gameMode = gameMode;
		this.players[0] = player1;
		this.players[1] = player2;
	}

	isPlayer(client: Socket) {
		return this.players.includes(client);
	}

	isSpecator(client: Socket) {
		return this.spectators.includes(client);
	}
}