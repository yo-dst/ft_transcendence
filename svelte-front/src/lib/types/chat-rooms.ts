export type chatRoom = {
	admins: number[];
	member: number[];
	banList: number[];
	ownerName: string;
	capacity: number;
	id: string;
	name: string;
	isPublic: boolean;
	isProtected: boolean;
}