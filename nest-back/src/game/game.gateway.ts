import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { gameRooms } from "src/matchmaking/sharedRooms";
import { CustomSocket } from "./game.customSocket";

@WebSocketGateway({ cors: { origin: "*", } })
export class GameGateway {
	@WebSocketServer() server: Server;
	private ready: number = 0;

	@SubscribeMessage('connection')
	handleConnection(@ConnectedSocket() client: CustomSocket) {
		console.log("hello");
		// verify if the room exist

		client.on('disconnect', () => {
			console.log("Disconncted !!");
		})
	}

	@SubscribeMessage('checkId')
	roomExist(client: CustomSocket, id: string | string[]) {
		const room = gameRooms.find((room) => (room.id === id));
		if (room) {
			client.emit("found");
			client.join(id);
			client.roomId = id;
			client.isPlayer = room.isPlayer(client);
			client.isSpectator = room.isSpecator(client);
		}
	}

	@SubscribeMessage('ready')
	checkReady(client: CustomSocket) {
		if (client.isPlayer) {
			this.ready++;
			client.playerIndex = this.ready;
			if (this.ready == 2) {
				this.ready = 0;
				this.server.to(client.roomId).emit('startTimer');
				setTimeout(() => {
					this.server.to(client.roomId).emit('startGame');
					console.log("done");
				}, 5000); // wait for 5 seconds
			}
		}
	}

	@SubscribeMessage('playerUp')
	up(client: CustomSocket, y: number) {
		if (client.isPlayer) {
			if (client.playerIndex === 1) {
				//check player index to determine which player should move
				this.server.to(client.roomId).emit('playerMove', [y[0] = 1, y[1]]);
			}
			else if (client.playerIndex == 2) {
				this.server.to(client.roomId).emit('playerMove', [y[0], y[1] = 1]);
			}
		}
	}

	@SubscribeMessage('playerDown')
	down(client: CustomSocket, y: number) {
		if (client.isPlayer === true) {
			//check player index to determine which player should move
			if (client.playerIndex === 1) {
				this.server.to(client.roomId).emit('playerMove', [y[0] = 2, y[1]]);
			}
			else if (client.playerIndex === 2) {
				this.server.to(client.roomId).emit('playerMove', [y[0], y[1] = 2]);
			}
		}
	}

	@SubscribeMessage('keyDown')
	HandleKeyDown(client: CustomSocket) {
		if (client.isPlayer === true) {
			if (client.playerIndex === 1) {
				this.server.to(client.roomId).emit('Down', 1);
			}
			else {
				this.server.to(client.roomId).emit('Down', 2);
			}
		}
	}


}