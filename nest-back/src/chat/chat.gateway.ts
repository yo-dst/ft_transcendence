import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UsersService } from "src/users/users.service";
import { ChatRoom } from "./chatRooms";

@WebSocketGateway({ namespace: 'chat', cors: { origin: "*" } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer() server: Server;

	constructor(
		private usersService: UsersService
	) { }

	private ChatRooms: ChatRoom[] = [];

	async handleConnection(client: Socket) {
		const user = await this.usersService.getByUsername(client.handshake.auth.username)
		client.data.userId = await user.id;
		client.data.username = client.handshake.auth.username;
	}

	handleDisconnect(client: Socket) {

	}

	@SubscribeMessage('createRoom')
	handleRoomCreation(client: Socket, info: string | number) {
		const room = new ChatRoom(client.data.userId, client.data.username, info[0], info[1], info[2]);
		client.join(room.id);
		this.ChatRooms.push(room);
		return room.id;
	}

	@SubscribeMessage('joinRoom')
	handleClientJoinRoom(client: Socket, info: string) {
		const room = this.ChatRooms.find((room) => (room.id === info[0]))
		console.log(room);
		console.log(info[1]);
		console.log(info[0]);
		if (room && (room.isPublic || info[1] === room.password)) {
			client.join(room.id);
			room.addUser(client.data.userId);
			return true;
		}
		return false;
	}

	@SubscribeMessage('getRooms')
	handleRoom(client: Socket) {
		return this.ChatRooms.map(({ password, banList, admins, owner, ...rest }) => rest);
	}

	@SubscribeMessage('newMessage')
	handleNewMessage(client: Socket, info: string) {
		if (this.ChatRooms.find((room) => (room.member.includes(client.data.userId))))
			this.server.to(info[0]).emit('newMessage', client.data.username, info[1]);
	}

	@SubscribeMessage('getRoomName')
	returnRoomName(client: Socket, roomId: string) {
		return this.ChatRooms.find((room) => room.id === roomId).name;
	}
}