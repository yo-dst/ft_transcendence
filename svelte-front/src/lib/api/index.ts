import { eventsSocket } from "$lib/stores/events-socket";
import { friendRequests } from "$lib/stores/friend-requests";
import { friends } from "$lib/stores/friends";
import { notifications } from "$lib/stores/notifications";
import { user } from "$lib/stores/user";
import type { Match } from "$lib/types/match";
import type { Profile } from "$lib/types/profile";
import { getFriendsStatus } from "$lib/utils/getFriendsStatus";
import { isUserConnected } from "$lib/utils/isUserConnected";
import { get } from "svelte/store";
import { apiUrl } from "./apiUrl";
import { matchSocket } from "$lib/stores/matchmaking-socket";

export const logoutUser = async () => {
	const res = await fetch(`${apiUrl}/auth/logout`, {
		credentials: "include",
	});
	if (!res.ok) {
		const error = await res.json();
		throw new error;
	}
	user.set(undefined);
	eventsSocket.update(value => {
		value?.disconnect();
		return undefined;
	});
}

export const loginUser = async () => {
	const res = await fetch(`${apiUrl}/user`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		throw error;
	}
	const data = await res.json();
	user.set(data);
}

export const fetchProfile = async (username: string): Promise<Profile> => {
	const res = await fetch(`${apiUrl}/users/profile/${username}`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	return await res.json();
}

export const fetchMatchHistory = async (
	username: string,
	startIndex: number,
	pageSize: number
): Promise<Match[]> => {
	const res = await fetch(`${apiUrl}/game?startIndex=${startIndex}&pageSize=${pageSize}&username=${username}`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw new error;
	}
	return await res.json();
}

export const updateUserUsername = async (newUsername: string) => {
	const res = await fetch(`${apiUrl}/user/username`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			newUsername,
		})
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	user.update(value => {
		let userUpdated = value;
		userUpdated.profile.username = newUsername;
		return userUpdated;
	});
	const evSocket = get(eventsSocket);
	evSocket.emit("update-username", newUsername);
}

export const updateUserAvatar = async (newAvatar: string) => {
	const res = await fetch(`${apiUrl}/user/avatar`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			newAvatar
		})
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	user.update(value => {
		let userUpdated = value;
		userUpdated.profile.avatar.url = newAvatar;
		return userUpdated;
	});
}

export const turnOnTwoFactorAuthentication = async (code: string) => {
	const res = await fetch(`${apiUrl}/2fa/turn-on`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			twoFactorAuthenticationCode: code,
		})
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	user.update(value => {
		return { ...value, isTwoFactorAuthenticationEnabled: true };
	});
}

export const turnOffTwoFactorAuthentication = async () => {
	const res = await fetch(`${apiUrl}/2fa/turn-off`, {
		method: "POST",
		credentials: "include",
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	user.update(value => {
		return { ...value, isTwoFactorAuthenticationEnabled: false };
	});
} 

export const fetchFriends = async () => {
	const res = await fetch(`${apiUrl}/user/friends`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	const profiles = await res.json();
	const profilesWithStatus = await getFriendsStatus(profiles);
	friends.set(profilesWithStatus);
}

export const fetchFriendRequests = async () => {
	const res = await fetch(`${apiUrl}/user/friend-requests`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	const data = await res.json();
	friendRequests.set(data);
}

export const sendFriendRequest = async (username: string) => {
	const res = await fetch(`${apiUrl}/friend-requests`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username })
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	const data = await res.json();
	const socket = get(eventsSocket);
	socket.emit("send-friend-request", {
		id: data.id,
		receiverUsername: username
	});
}

export const acceptFriendRequest = async (friendRequestId: number) => {
	const res = await fetch(`${apiUrl}/friend-requests/accept/${friendRequestId}`, {
		method: "POST",
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	const creatorProfile = await res.json();
	const newFriend = {
		isConnected: await isUserConnected(creatorProfile.username),
		isInGame: false,
		profile: creatorProfile
	};
	friends.update(value => [...value, newFriend]);
	friendRequests.update(value => value.filter(request => request.id !== friendRequestId));
	notifications.update(value => value.filter(notification => {
		if (notification.type === "friend-request" && notification.data.id === friendRequestId) {
			return false;
		}
		return true;
	}));
	const socket = get(eventsSocket);
	socket.emit("accept-friend-request", creatorProfile.username);
}

export const declineFriendRequest = async (friendRequestId: number) => {
	const res = await fetch(`${apiUrl}/friend-requests/decline/${friendRequestId}`, {
		method: "POST",
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	friendRequests.update(value => value.filter(request => request.id !== friendRequestId));
	notifications.update(value => value.filter(notification => (notification.type !== "friend-request" && notification.data.id === friendRequestId)));
}

export const removeFriend = async (username: string) => {
	const res = await fetch(`${apiUrl}/user/remove-friend`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username })
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	friends.update(value => value.filter(friend => friend.profile.username !== username));
	const socket = get(eventsSocket);
	socket.emit("remove-friend", username);
}

export const generateTwoFactorAuthenticationQrCode = async (): Promise<string> => {
	const res = await fetch(`${apiUrl}/2fa/generate`, {
		method: "post",
		credentials: "include",
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	return await res.text();
}

export const loginUserWithTwoFactorAuthentication = async (code: string) => {
	const res = await fetch(`http://${apiUrl}:3000/2fa/login`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			twoFactorAuthenticationCode: code
		})
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
}

export const fetchBlockList = async () => {
	const res = await fetch(`${apiUrl}/user/blocked-users`, {
		credentials: "include",
	})
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	const blockedProfile = await res.json();
	user.update(value => {
		let userUpdated = value;
		userUpdated.blocked = blockedProfile;
		return userUpdated;
	});
}

export const blockUser = async (usernameToBlock: string) => {
	const res = await fetch(`${apiUrl}/user/block-user`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			usernameToBlock
		})
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	let blockedProfile = await res.json();
	user.update(value => {
		let userUpdated = value;
		userUpdated.blocked?.push(blockedProfile);
		return userUpdated;
	});
}

export const unblockUser = async (usernameToUnblock: string) => {
	const res = await fetch(`${apiUrl}/user/unblock-user`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			usernameToUnblock
		})
	});
	if (!res.ok) {
		const error = await res.json();
		if (error.statusCode === 401) {
			user.set(undefined);
		}
		throw error;
	}
	let unblockedId = await res.json();
	user.update(value => {
		let userUpdated = value;
		userUpdated.blocked?.splice(value.blocked?.indexOf(unblockedId), 1);
		return userUpdated;
	});
}

export const acceptGameRequest = (creatorUsername: string) => {
	const socket = get(matchSocket);
	socket.emit("gameRequestAccepted");
	notifications.update(value => value.filter(notification => {
		if (notification.type === "game-request" && notification.data.creator.username === creatorUsername) {
			return false;
		}
		return true;
	}));
}

export const declineGameRequest = (creatorUsername: string) => {
	const socket = get(matchSocket);
	socket.emit("matchDenied");
	notifications.update(value => value.filter(notification => {
		if (notification.type === "game-request" && notification.data.creator.username === creatorUsername) {
			return false;
		}
		return true;
	}));
}