import type { Socket } from "socket.io-client";

export type UserType = undefined | {
	id?: number;
	socket?: Socket,
	state?: number,
	email?: string;
	username?: string;
	twoFactorAuthenticationSecret?: string;
	isTwoFactorAuthenticationEnabled: boolean;
	avatar?: string;
}
