import type { FriendRequest } from "./friend-request"

export type Notification = {
	type: string,
	data: FriendRequest
}