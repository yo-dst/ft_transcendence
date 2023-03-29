import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { gameRooms } from "src/matchmaking/sharedRooms";
import { CustomSocket } from "./game.customSocket";

@WebSocketGateway({ namespace: 'game', cors: { origin: "*", } })
export class GameGateway {
	@WebSocketServer() server: Server;

	@SubscribeMessage('connection')
	handleConnection(@ConnectedSocket() client: CustomSocket) {
		client.email = client.handshake.query.email as string;

		client.on('disconnect', () => {
		})
	}

	// verify if the room with id exist
	@SubscribeMessage('checkId')
	roomExist(client: CustomSocket, info: string) {
		const room = gameRooms.find((room) => (room.id === info[0]));
		if (room) {
			client.emit("found", room.gameMode);
			client.join(info[0]);
			client.roomId = info[0];
			client.isPlayer = room.isPlayer(info[1]);
			client.isSpectator = room.isSpecator(info[1]);
		}
	}

	@SubscribeMessage('ready')
	checkReady(client: CustomSocket) {
		const room = gameRooms.find((room) => (room.id === client.roomId));
		if (client.isPlayer) {
			room.nbPlayerRdy++;
			client.playerIndex = room.nbPlayerRdy;
			if (room.nbPlayerRdy == 2) {
				room.nbPlayerRdy = 0;
				this.server.to(client.roomId).emit('startTimer');
				let counter = 6;
				const intervalId = setInterval(() => {
					this.server.to(client.roomId).emit('decrTimer', counter);
					counter--;
					if (counter <= -1) {
						clearInterval(intervalId); // stop the interval after 5 seconds
						this.server.to(client.roomId).emit('startGame');
						room.startGame(this.server);
					}
				}, 1000); // emit 'decrTimer' event every 1 second
			}
		}
	}

	@SubscribeMessage('playerUp')
	up(client: CustomSocket, y: number) {
		const room = gameRooms.find((room) => (room.id === client.roomId));
		if (client.isPlayer && room.gameInfo != undefined) {
			if (client.playerIndex === 1) {
				//check player index to determine which player should move
				room.paddle1.dir = 1;
				this.server.to(client.roomId).emit('playerMove', [y[0] = 1, y[1]]);
			}
			else if (client.playerIndex == 2) {
				room.paddle2.dir = 1;
				this.server.to(client.roomId).emit('playerMove', [y[0], y[1] = 1]);
			}
		}
	}

	@SubscribeMessage('playerDown')
	down(client: CustomSocket, y: number) {
		const room = gameRooms.find((room) => (room.id === client.roomId));
		if (client.isPlayer === true && room.gameInfo != undefined) {
			//check player index to determine which player should move
			if (client.playerIndex === 1) {
				room.paddle1.dir = 2;
				this.server.to(client.roomId).emit('playerMove', [y[0] = 2, y[1]]);
			}
			else if (client.playerIndex === 2) {
				room.paddle2.dir = 2;
				this.server.to(client.roomId).emit('playerMove', [y[0], y[1] = 2]);
			}
		}
	}

	@SubscribeMessage('keyReleased')
	HandleKeyDown(client: CustomSocket) {
		const room = gameRooms.find((room) => (room.id === client.roomId));
		if (client.isPlayer === true && room.gameInfo != undefined) {
			if (client.playerIndex === 1) room.paddle1.dir = 0;
			else if (client.playerIndex === 2) room.paddle2.dir = 0;
			this.server.to(client.roomId).emit('Down', [{ x: room.paddle1.x, y: room.paddle1.y, dir: room.paddle1.dir }, { x: room.paddle2.x, y: room.paddle2.y, dir: room.paddle2.dir }]);
		}
	}

	@SubscribeMessage('destroyGame')
	handleGameEnd(client: CustomSocket) {
		const room = gameRooms.findIndex((room) => (room.id === client.roomId));
		if (client.isPlayer === true && room != -1) {
			gameRooms.splice(room, 1);
		}
	}

}