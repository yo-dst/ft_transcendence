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
		if (user) {
			client.data.userId = user.id;
			client.data.username = client.handshake.auth.username;
		}
	}

	handleDisconnect(client: Socket) {

	}

	async sendConnectedUsers(channelId: string, room: ChatRoom) {
		const memberUsername = await Promise.all(room.member.map(async (user) => ((await this.usersService.getProfile(user)).username)));
		const adminUsername = await Promise.all(room.admins.map(async (user) => ((await this.usersService.getProfile(user)).username)));
		this.server.to(channelId).emit('updateConnectedUsers', { member: memberUsername, admin: adminUsername, owner: (await this.usersService.getProfile(room.owner)).username });
	}

	@SubscribeMessage('createRoom')
	async handleRoomCreation(client: Socket, info: string | number) {
		const room = new ChatRoom(client.data.userId, await (this.usersService.getProfile(client.data.userId)), info[0], info[1], info[2], info[3]);
		client.join(room.id);
		this.ChatRooms.push(room);
		this.server.emit('roomUpdate', this.handleRoom());
		client.emit('joinRoom', room.id);
		return room.id;
	}

	@SubscribeMessage('joinRoom')
	async handleClientJoinRoom(client: Socket, info: string) {
		const room = this.ChatRooms.find((room) => (room.id === info[0]))
		if (room && (!room.isProtected || info[1] === room.password || room.member.includes(client.data.userId) || room.admins.includes(client.data.userId) || room.owner === client.data.userId)) {
			client.join(room.id);
			room.addUser(client.data.userId);
			this.sendConnectedUsers(info[0], room);
			this.server.emit('roomUpdate', this.handleRoom());
			client.emit('joinRoom', room.id);
			return true;
		}
		return false;
	}

	@SubscribeMessage('getRooms')
	handleRoom() {
		// return only public chatRooms with only the relevant informations
		return this.ChatRooms.filter((room) => (room.isPublic === true)).map(({ password, banList, ...rest }) => rest);
	}

	@SubscribeMessage('newMessage')
	handleNewMessage(client: Socket, info: string) {
		if (this.ChatRooms.find((room) => (room.member.includes(client.data.userId) || room.admins.includes(client.data.userId) || room.owner === client.data.userId))) {
			this.server.to(info[0]).emit('newMessage', client.data.username, info[1], info[0]);
		}
	}

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
	async handleQuitRoom(client: Socket, ids: string | number) {
		const room = this.ChatRooms.find((room) => (room.id === ids[0]));
		room.deleteUser(ids[1]);
		if (room.owner === undefined)
			this.ChatRooms.splice(this.ChatRooms.indexOf(room), 1);
		else {
			this.sendConnectedUsers(ids[0], room);
		}
		this.server.emit('roomUpdate', this.handleRoom());
	}

	@SubscribeMessage('verifyUser')
	async handleUserVerification(client: Socket, channelId: string) {
		const room = this.ChatRooms.find((room) => (room.id === channelId));
		if (room) {
			const memberUsername = await Promise.all(room.member.map(async (user) => ((await this.usersService.getProfile(user)).username)));
			const adminUsername = await Promise.all(room.admins.map(async (user) => ((await this.usersService.getProfile(user)).username)));
			if (room.member.includes(client.data.userId) || room.admins.includes(client.data.userId) || room.owner === client.data.userId) {
				client.join(channelId);
				return { isConnected: true, roomName: room.name, isAdmin: room.admins.includes(client.data.userId), connectedUser: { member: memberUsername, admin: adminUsername, owner: (await this.usersService.getProfile(room.owner)).username } }
			}
			return { isConnected: false, roomName: room.name, isAdmin: room.admins.includes(client.data.userId), connectedUser: { member: memberUsername, admin: adminUsername, owner: (await this.usersService.getProfile(room.owner)).username } }
		}
		return undefined;
	}

	@SubscribeMessage('newAdmin')
	async addNewUser(client: Socket, info: any) {
		const room = this.ChatRooms.find((room) => (room.id === info[0]));
		if (room) {
			room.addAdmin((await this.usersService.getByUsername(info[1])).id);
			this.sendConnectedUsers(info[0], room);
		}
	}
}