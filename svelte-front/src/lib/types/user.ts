import { io, Socket } from "socket.io-client";
import { writable } from "svelte/store";

const State = {
	offline: 0,
	online: 1,
	inGame: 2
}

export type UserType = undefined | {
	id?: number,
	socket?: Socket,
	state: number,
	email?: string;
	username?: string;
	twoFactorAuthenticationSecret?: string;
	isTwoFactorAuthenticationEnabled: boolean;
	avatar: string;
}

const user: UserType = {
	socket: undefined,
	state: State.offline,
	id: undefined,
	email: undefined,
	username: undefined,
	twoFactorAuthenticationSecret: undefined,
	isTwoFactorAuthenticationEnabled: false
}

export const User = writable(user);