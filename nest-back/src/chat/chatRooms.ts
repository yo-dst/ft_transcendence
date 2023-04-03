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
	public isProtected: boolean;

	constructor(owner: number, ownerName: string, name: string, capacity: number, password: string, isPrivate: boolean) {
		this.name = name;
		this.owner = owner;
		this.admins.push(owner);
		this.member.push(owner);
		this.ownerName = ownerName;
		this.isPublic = isPrivate === true ? false : true;
		if (password) {
			this.password = password;
			this.isProtected = false;
		}
		else
			this.isProtected = true;
		this.capacity = capacity;
		this.id = v4();
	}

	addUser(userId: number) {
		if (!this.member.includes(userId) && this.capacity >= this.member.length) {
			this.member.push(userId);
		}
	}

	update(isPrivate: boolean, password: string) {
		this.isPublic = isPrivate === true ? false : true;
		if (password && password != "") {
			this.password = password;
			this.isProtected = true;
		}
		else this.isProtected = false;
	}

}