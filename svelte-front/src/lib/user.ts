import { io, Socket } from "socket.io-client";
import { writable } from "svelte/store";

const State = {
	offline: 0,
	online: 1,
	inGame: 2
}

type userType = {
	socket: Socket,
	state: number,
	id?: number,
}

const user: userType = {
	socket: io("localhost:3000"),
	state: State.offline,
	id: undefined,
}

export const User = writable(user);