import type { Socket } from "socket.io-client";
import type { AvatarType } from "./avatar";

const State = {
	offline: 0,
	online: 1,
	inGame: 2
}

export type UserType = {
	id?: number;
	socket?: Socket,
	state?: number,
	email?: string;
	username?: string;
	twoFactorAuthenticationSecret?: string;
	isTwoFactorAuthenticationEnabled: boolean;
	avatar?: AvatarType;
	friends?: UserType[];
}
