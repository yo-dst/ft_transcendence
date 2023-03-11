import { Socket } from "socket.io";

export class CustomSocket extends Socket {
	//add a roomId property to the CustomSocket class
	roomId: string | string[];
	intra: string;
	isPlayer: boolean = false;
	isSpectator: boolean = false;
	playerIndex: number = 0;
}