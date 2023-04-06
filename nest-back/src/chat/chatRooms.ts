import { Profile } from 'src/users/entities/profile.entity';
import { v4 } from 'uuid';

export class ChatRoom {
	public name: string;
	public admins: number[] = [];
	public member: number[] = [];
	public banList: number[] = [];
	public owner: number;
	public password: string;
	public capacity: number;
	public id: string;
	public isPublic: boolean;
	public isProtected: boolean;
	public ownerProfile: Profile;

	constructor(owner: number, ownerProfile:Profile,  name: string, capacity: number, password: string, isPrivate: boolean) {
		this.name = name;
		this.owner = owner;
		this.admins.push(owner);
		this.member.push(owner);
		this.ownerProfile = ownerProfile;
		this.isPublic = isPrivate === true ? false : true;
		if (password) {
			this.password = password;
			this.isProtected = true;
		}
		else
			this.isProtected = false;
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

	deleteUser(userId: number){
		this.member.splice(this.member.findIndex((member) => (member === userId)), 1);
		this.admins.splice(this.admins.findIndex((admins) => (admins === userId)), 1);
		if (this.member.length > 0) {
			this.owner = this.member[0];
		}
	}

}