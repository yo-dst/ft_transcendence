import { eventsSocket } from "$lib/stores/events-socket";
import { get } from "svelte/store";

export function sendGameRequest(username: string) {
	const socket = get(eventsSocket);
	socket.emit("send-game-request", username);
}