import { Injectable } from "@nestjs/common";
import { Socket } from "socket.io";

@Injectable()
export class GameRoom {
	public id: string;
	public players: Socket[] = new Array(2);
	public spectators: Socket[] = [];

	constructor(id: string, player1: Socket, player2: Socket) {
		this.id = id;
		this.players[0] = player1;
		this.players[1] = player2;
	}
}