import type { Profile } from "./profile";

export type chatRoom = {
	admins: number[];
	member: number[];
	banList: number[];
	ownerProfile: Profile;
	owner: number;
	capacity: number;
	id: string;
	name: string;
	isProtected: boolean;
}