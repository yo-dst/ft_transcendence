import { v4 } from 'uuid';

export class ChatRoom {
	public name: string;
	public admins: number[] = [];
	public member: number[] = [];
	public banList: number[] = [];
	public owner: number;
	public ownerName: string;
	public password: string;
	public capacity: number;
	public id: string;
	public isPublic: boolean;

	constructor(owner: number, ownerName: string, name: string, capacity: number, password: string) {
		this.name = name;
		this.owner = owner;
		this.admins.push(owner);
		this.member.push(owner);
		this.ownerName = ownerName;
		if (password) {
			this.password = password;
			this.isPublic = false;
		}
		else
			this.isPublic = true;
		this.capacity = capacity;
		this.id = v4();
	}

	addUser(userId: number) {
		if (!this.member.includes(userId) && this.capacity >= this.member.length) {
			this.member.push(userId);
		}
	}

}