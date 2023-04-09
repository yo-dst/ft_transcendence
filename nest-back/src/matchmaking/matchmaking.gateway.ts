import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { v4 } from 'uuid';
import { gameRooms } from './sharedRooms';
import { GameRoom } from './gameRoom';
import { CustomSocket } from 'src/game/game.customSocket';
import { GameService } from 'src/game/game.service';

@WebSocketGateway({
	namespace: 'matchmaking',
	cors: { origin: '*' }
})
export class MatchmakingGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(
		private gameService: GameService
	) { }

	@WebSocketServer() server: Server;
	private masterQueue: CustomSocket[][] = [[], [], []];

	handleConnection(client: CustomSocket) {
		client.userId = client.handshake.auth.userId;
	}

	handleDisconnect(client: CustomSocket) {
		for (let i = 0; i < this.masterQueue.length; i++) {
			const sockets = this.masterQueue[i];
			const index = sockets.findIndex(socket => socket.userId === client.userId);

			if (index !== -1) {
				// If the id is found in the array, remove the corresponding CustomSocket object
				sockets.splice(index, 1);
				break;
			}
		}
	}

	@SubscribeMessage('joinQueue')
	joinQueue(client: CustomSocket, gameMode: number) {
		if (!this.masterQueue[gameMode].find((c) => (c.userId === client.userId))) {
			this.masterQueue[gameMode].push(client);
			this.matchPlayers(gameMode);
		}
	}

	@SubscribeMessage('leaveQueue')
	leaveQueue(client: CustomSocket, gameMode: number) {
		const index = this.masterQueue[gameMode].findIndex((c) => (c.userId === client.userId));
		if (index !== -1) {
			this.masterQueue[gameMode].splice(index, 1);
		}
	}

	// if 2 players in the array, match them and create a new room
	matchPlayers(gameMode: number) {
		if (this.masterQueue[gameMode].length >= 2) {
			const p1 = this.masterQueue[gameMode].shift();
			const p2 = this.masterQueue[gameMode].shift();
			const roomId = v4();

			// create a new room in the shared instance of GameRooms
			const room = new GameRoom(this.gameService, roomId, gameMode, p1.userId, p2.userId);
			gameRooms.push(room);

			// send roomId to players
			p2.emit('matched', roomId);
			p1.emit('matched', roomId);
		}
	}
}