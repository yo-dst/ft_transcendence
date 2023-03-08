import { ConsoleLogger } from "@nestjs/common";
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { gameRooms } from "src/matchmaking/sharedRooms";

@WebSocketGateway({ path: "/game", cors: { origin: "*", } })
export class GameGateway {
	@WebSocketServer() server: Server;

	@SubscribeMessage('connection')
	handleConnection(client: Socket) {
		// verify if the room exist
		const id = client.handshake.query.id;
		if (!this.roomExist(id))
			return
		client.emit('Found');

		client.on('disconnect', () => {
			console.log("Disconncted !!");
		})
	}

	roomExist(id: string | string[]) {
		return gameRooms.find((room) => (room.id === id));
	}
}