import type { Socket } from "socket.io-client";
import type { Profile } from "./profile";

const State = {
	offline: 0,
	online: 1,
	inGame: 2
}

export type UserType = {
	isLoggedIn: boolean,
	isTwoFactorAuthenticationEnabled: boolean,
	profile?: Profile,
	socket?: Socket,
	state?: number,
	email?: string
}
