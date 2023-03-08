import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({
	path: "/matchmaking",
	cors: { origin: '*' }
})
export class MatchmakingGateway {
	@WebSocketServer() server: Server;
	private masterQueue: Socket[][] = [[], [], []];


	@SubscribeMessage('connection')
	handleConnection(client: Socket) {
		this.server.emit('game-message', "you joined !");

		client.on('disconnect', () => {
			console.log("Disconncted !!");
		})
	}

	@SubscribeMessage('joinQueue')
	joinQueue(client: Socket, gameMode: number) {
		this.masterQueue[gameMode].push(client);
		this.matchPlayers(gameMode);
	}

	@SubscribeMessage('leaveQueue')
	leaveQueue(client: Socket, gameMode: number) {
		const index = this.masterQueue[gameMode].indexOf(client);
		this.masterQueue[gameMode].slice(index, 1);
	}

	matchPlayers(gameMode: number) {
		if (this.masterQueue[gameMode].length == 2) {
			const p1 = this.masterQueue[gameMode].shift();
			const p2 = this.masterQueue[gameMode].shift();
		}
	}
}
