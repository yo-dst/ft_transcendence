import { eventsSocket } from "$lib/stores/events-socket";
import { user } from "$lib/stores/user";
import type { FriendRequest } from "$lib/types/friend-request";
import type { Match } from "$lib/types/match";
import type { Profile } from "$lib/types/profile";

const host = "http://localhost:3000";

export const logoutUser = async (): Promise<void> => {
	const res = await fetch(`${host}/auth/logout`, {
		credentials: "include",
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	user.update(value => {
		return {
			...value,
			isLoggedIn: false,
			profile: undefined
		}
	});
	eventsSocket.update(value => {
		value?.disconnect();
		return undefined;
	});
}

export const loginUser = async (): Promise<void> => {
	const res = await fetch(`${host}/user`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	const data = await res.json();
	user.update(value => {
		return {
			...data,
			isLoggedIn: true,
		};
	});
}

export const fetchProfile = async (username: string): Promise<Profile> => {
	const res = await fetch(`${host}/users/profile/${username}`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	return await res.json();
}

export const fetchMatchHistory = async (
	username: string,
	startIndex: number,
	pageSize: number
): Promise<Match[]> => {
	const res = await fetch(`${host}/game?startIndex=${startIndex}&pageSize=${pageSize}&username=${username}`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	return await res.json();
}

export const updateUserUsername = async (newUsername: string): Promise<void> => {
	const res = await fetch(`${host}/user/username`, {
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
		throw new Error(error.message);
	}
	user.update(value => {
		let userUpdated = value;
		userUpdated.profile.username = newUsername;
		return userUpdated;
	});
}

export const updateUserAvatar = async (newAvatar: string): Promise<void> => {
	const res = await fetch(`${host}/user/avatar`, {
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
		throw new Error(error.message);
	}
	user.update(value => {
		let userUpdated = value;
		userUpdated.profile.avatar.url = newAvatar;
		return userUpdated;
	});
}

export const turnOnTwoFactorAuthentication = async (code: string): Promise<void> => {
	const res = await fetch(`${host}/2fa/turn-on`, {
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
		throw new Error(error.message);
	}
	user.update(value => {
		return { ...value, isTwoFactorAuthenticationEnabled: true };
	});
}

export const turnOffTwoFactorAuthentication = async (): Promise<void> => {
	const res = await fetch(`${host}/2fa/turn-off`, {
		method: "POST",
		credentials: "include",
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	user.update(value => {
		return { ...value, isTwoFactorAuthenticationEnabled: false };
	});
} 

export const fetchFriendsProfile = async (): Promise<Profile[]> => {
	const res = await fetch(`${host}/user/friends`, {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	return await res.json();
}

export const fetchFriendRequests = async (): Promise<FriendRequest[]> => {
	const res = await fetch("http://localhost:3000/user/friend-requests", {
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	return await res.json();
}

export const sendFriendRequest = async (username: string): Promise<FriendRequest> => {
	const res = await fetch(`${host}/friend-requests`, {
		method: "POST",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username })
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	return await res.json();
}

export const acceptFriendRequest = async (friendRequestId: number): Promise<Profile> => {
	const res = await fetch(`${host}/friend-requests/accept/${friendRequestId}`, {
		method: "POST",
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	return await res.json();
}

export const declineFriendRequest = async (friendRequestId: number): Promise<void> => {
	const res = await fetch(`${host}/friend-requests/decline/${friendRequestId}`, {
		method: "POST",
		credentials: "include"
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
}

export const removeFriend = async (username: string): Promise<void> => {
	const res = await fetch(`${host}/user/remove-friend`, {
		method: "PATCH",
		credentials: "include",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username })
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
}

export const generateTwoFactorAuthenticationQrCode = async (): Promise<string> => {
	const res = await fetch(`${host}/2fa/generate`, {
		method: "post",
		credentials: "include",
	});
	if (!res.ok) {
		const error = await res.json();
		throw new Error(error.message);
	}
	return await res.text();
}

export const loginUserWithTwoFactorAuthentication = async (code: string): Promise<void> => {
	const res = await fetch("http://localhost:3000/2fa/login", {
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
		throw new Error(error.message);
	}
}