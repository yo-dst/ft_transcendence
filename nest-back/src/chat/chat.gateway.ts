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
		client.data.userId = user.id;
		client.data.username = client.handshake.auth.username;
		client.emit('loaded');
	}

	handleDisconnect(client: Socket) {

	}

	@SubscribeMessage('createRoom')
	handleRoomCreation(client: Socket, info: string | number) {
		const room = new ChatRoom(client.data.userId, client.data.username, info[0], info[1], info[2], info[3]);
		client.join(room.id);
		this.ChatRooms.push(room);
		this.server.emit('roomUpdate', this.handleRoom());
		return room.id;
	}

	@SubscribeMessage('joinRoom')
	handleClientJoinRoom(client: Socket, info: string) {
		const room = this.ChatRooms.find((room) => (room.id === info[0]))
		if (room && (!room.isProtected || info[1] === room.password || room.member.includes(client.data.userId))) {
			client.join(room.id);
			room.addUser(client.data.userId);
			this.server.emit('roomUpdate', this.handleRoom());
			return true;
		}
		return false;
	}

	@SubscribeMessage('getRooms')
	handleRoom() {
		// return only public chatRooms with only the relevant informations
		return this.ChatRooms.filter((room) => (room.isPublic === true)).map(({ password, banList, admins, owner, ...rest }) => rest);
	}

	@SubscribeMessage('newMessage')
	handleNewMessage(client: Socket, info: string) {
		if (this.ChatRooms.find((room) => (room.member.includes(client.data.userId)))) {
			this.server.to(info[0]).emit('newMessage', client.data.username, info[1]);
		}
	}

	@SubscribeMessage('getInfo')
	returnRoomName(client: Socket, roomId: string) {
		const room = this.ChatRooms.find((room) => (room.id === roomId));
		return { roomName: room.name, isPublic: room.isPublic }
	};

	@SubscribeMessage('roomUpdate')
	handleRoomUpdate(client: Socket, info: string | boolean) {
		const room = this.ChatRooms.find((room) => (room.id === info[0]));
		room.update(info[1], info[2]);
		this.server.emit('roomUpdate', this.handleRoom());
	}

	@SubscribeMessage('getRoomScope')
	returnRoomScore(client: Socket, roomId: string) {
		return this.ChatRooms.find((room) => (room.id === roomId)).isPublic;
	}

	@SubscribeMessage('leaveRoom')
	handleQuitRoom(client: Socket, ids: string | number) {
		const room = this.ChatRooms.find((room) => (room.id === ids[0]));
		room.deleteUser(ids[1]);
		if (room.member.length === 0)
			this.ChatRooms.splice(this.ChatRooms.indexOf(room), 1);
		this.server.emit('roomUpdate', this.handleRoom());
	}

	@SubscribeMessage('verifyUser')
	handleUserVerification(client: Socket, channelId: string) {
		const room = this.ChatRooms.find((room) => (room.id === channelId));
		if (room.member.includes(client.data.userId)) {
			client.join(channelId);
			return true;
		}
		return false;
	}
}