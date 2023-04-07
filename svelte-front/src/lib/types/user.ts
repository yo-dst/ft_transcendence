import type { Socket } from "socket.io-client";
import type { Profile } from "./profile";

export type UserType = {
	id: number
	isTwoFactorAuthenticationEnabled: boolean,
	profile: Profile,
	blocked: Profile[]
}
