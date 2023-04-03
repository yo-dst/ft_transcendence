import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
	cors: { origin: "http://localhost:5173" },
	namespace: 'events'
})
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {
	private logger = new Logger();

	private connectedUsers: { socketId: string, username: string }[] = [];

	@WebSocketServer()
 	server: Server;

	handleConnection(client: Socket) {
		const username = client.handshake.auth.username;
		client.data.username = username;
		this.connectedUsers.push({
			socketId: client.id,
			username: username
		});
		this.server.emit("user-connected", username);

		this.logger.log(username + " connected");
	}

	handleDisconnect(client: Socket) {
		const username = client.handshake.auth.username;
		const index = this.connectedUsers.findIndex(user => user.username === username);
		if (index !== -1) {
			this.connectedUsers.splice(index, 1);
			this.server.emit("user-disconnected", username);
		}
		
		this.logger.log(username + " disconnected");
	}

	@SubscribeMessage("send-friend-request")
	handleSendFriendRequest(
		@ConnectedSocket() client: Socket,
		@MessageBody() data: any
	) {
		const index = this.connectedUsers.findIndex(user => user.username === data.receiverUsername);
		if (index !== -1) {
			const socketId = this.connectedUsers[index].socketId;
			this.server.to(socketId).emit("receive-friend-request", { id: data.id, creatorUsername: client.data.username });
		}
	}

	@SubscribeMessage("send-game-request")
	handleSendGameRequest(
		@ConnectedSocket() client: Socket,
		@MessageBody() username: string
	) {
		const index = this.connectedUsers.findIndex(user => user.username === username);
		if (index !== -1) {
			const socketId = this.connectedUsers[index].socketId;
			this.server.to(socketId).emit("receive-game-request", client.data.username);
		}
	}

	@SubscribeMessage("remove-friend")
	handleRemoveFriend(
		@ConnectedSocket() client: Socket,
		@MessageBody() username: string
	): void {
		const index = this.connectedUsers.findIndex(user => user.username === username);
		if (index !== -1) {
			const socketId = this.connectedUsers[index].socketId;
			this.server.to(socketId).emit("friend-removed", client.data.username);
		}
	}

	@SubscribeMessage("get-users")
	getUsers(): string[] {
		return this.connectedUsers.map(user => user.username);
	}

	@SubscribeMessage("is-user-connected")
	getUserStatus(@MessageBody() username: string): boolean {
		const index = this.connectedUsers.findIndex(user => user.username === username);
		return (index !== -1);
	}

	@SubscribeMessage("accept-friend-request")
	handleAcceptFriendRequest(
		@ConnectedSocket() client: Socket,
		@MessageBody() username: string
	) {
		const index = this.connectedUsers.findIndex(user => user.username === username);
		if (index !== -1) {
			this.server.to(this.connectedUsers[index].socketId).emit("friend-request-accepted", client.data.username);
		}
	}
}