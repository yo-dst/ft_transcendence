import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "dgram";
import { Server } from "socket.io";
import { gameRooms } from "src/matchmaking/sharedRooms";
import { CustomSocket } from "./game.customSocket";

@WebSocketGateway({ namespace: 'game', cors: { origin: "*", } })
export class GameGateway {
	@WebSocketServer() server: Server;

	@SubscribeMessage('connection')
	handleConnection(@ConnectedSocket() client: CustomSocket) {
		client.email = client.handshake.query.email as string;
		console.log("email : ", client.email);
		// verify if the room exist

		client.on('disconnect', () => {
			console.log("Disconncted !!");
		})
	}

	@SubscribeMessage('checkId')
	roomExist(client: CustomSocket, id: string) {
		const room = gameRooms.find((room) => (room.id === id));
		console.log('enter checkid')
		if (room) {
			client.emit("found");
			client.join(id);
			client.roomId = id;
			client.isPlayer = room.isPlayer(client.email);
			client.isSpectator = room.isSpecator(client.email);
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
					console.log("nb :", counter);
					if (counter <= -1) {
						clearInterval(intervalId); // stop the interval after 5 seconds
						this.server.to(client.roomId).emit('startGame');
					}
				}, 1000); // emit 'decrTimer' event every 1 second
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

	@SubscribeMessage('keyReleased')
	HandleKeyDown(client: CustomSocket, paddle: any) {
		if (client.isPlayer === true) {
			if (client.playerIndex === 1) {
				this.server.to(client.roomId).emit('Down', 1, paddle);
			}
			else {
				this.server.to(client.roomId).emit('Down', 2, paddle);
			}
		}
	}

	@SubscribeMessage('score')
	handleScore(client: CustomSocket, player: string) {
		const room = gameRooms.find((room) => (room.id === client.roomId));
		if (client.isPlayer) {
			if (player == "p1" && room.ready) {
				room.score[0]++;
				room.ready = !room.ready;
				this.server.to(client.roomId).emit('scoreInc', "p1");
			}
			else if (player == "p2") {
				if (room.ready) {
					room.score[1]++;
					room.ready = !room.ready;
					this.server.to(client.roomId).emit('scoreInc', "p2");
				}
			}
			if (room.score[0] == 10 || room.score[1] == 10) this.server.to(client.roomId).emit('endGame');
		}
	}

	@SubscribeMessage('ballCollision')
	handleCollision(client: CustomSocket, ball: any) {
		if (client.isPlayer) {
			let isWall = false;
			if (ball[1] == "wall") {
				ball[0].y_vel *= -1;
				isWall = true;
			}
			else if (ball[1] == "paddle") {
				ball[0].x_vel *= -1.1;
				ball[0].y_vel *= 1.1;
			}
			this.server.to(client.roomId).emit('collision', [ball[0], isWall]);
		}
	}

	@SubscribeMessage('reset')
	handleReset(client: CustomSocket, ball: any) {
		const room = gameRooms.find((room) => (room.id === client.roomId));
		if (client.isPlayer) {
			room.nbPlayerRdy++;
			if (room.nbPlayerRdy >= 2) {
				room.ready = true;
				this.server.to(client.roomId).emit('resetBall', [Math.random() < 0.5 ? 1 : -1, Math.random() < 0.5 ? 1 : -1]);
			}
		}
	}

	@SubscribeMessage('destroyTimer')
	handleTimer(client: CustomSocket, ball: any) {
		this.server.to(client.roomId).emit('destroyTimer');
	}

}