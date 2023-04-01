import { ConnectedSocket, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";


@WebSocketGateway({ namespace: 'chat', cors: { origin: "*" } })
export class ChatGateway {
	@WebSocketServer() server: Server;
	private rooms: string[];

	@SubscribeMessage('connection')
	handleConnection(@ConnectedSocket() client: Socket) {

	}

	@SubscribeMessage('createRoom')
	handleRoomCreation(client: Socket) {

	}

	@SubscribeMessage('joinRoom')
	handleClientJoinRoom(client: Socket) {

	}
}