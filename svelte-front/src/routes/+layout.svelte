<script lang="ts">
	import "@picocss/pico";
	import "../app.css";
	import 'iconify-icon';
	import { onMount } from "svelte";
	import { user } from "$lib/stores/user";
	import { eventsSocket } from "$lib/stores/events-socket";
	import { notifications } from "$lib/stores/notifications";
	import { io } from "socket.io-client";
    import { fetchBlockList, fetchFriendRequests, fetchFriends, fetchProfile, loginUser } from "$lib/api";
    import LoginPage from "$lib/components/LoginPage.svelte";
    import type { Notification } from "$lib/types/notification";
    import type { FriendRequest } from "$lib/types/friend-request";
    import { friendRequests } from "$lib/stores/friend-requests";
    import { chatSocket } from "$lib/stores/chat-socket";
    import { chatMessages } from "$lib/stores/chat-messages";
    import { friends } from "$lib/stores/friends";
    import { isUserConnected } from "$lib/utils/isUserConnected";
    import { isUserInGame } from "$lib/utils/isUserInGame";
    import type { GameRequest } from "$lib/types/game-request";
    import { matchSocket } from "$lib/stores/matchmaking-socket";
    import { goto } from "$app/navigation";
	import { apiUrl } from "$lib/api/apiUrl";

	$: console.log("user connected", $user);

	$: console.log("friends", $friends);

	onMount(async () => {
		try {
			await loginUser();

			$eventsSocket = io(`${apiUrl}/events`, {
				auth: {
					username: $user.profile.username
				}
			});

			$chatSocket = io(`${apiUrl}/chat`, { auth: { username: $user.profile?.username } });

			$matchSocket = io(`${apiUrl}/matchmaking`, {auth: {userId: $user.id}});
			
			$matchSocket.on("matched", (id) => {
				goto("/game/" + id);
			});

			await fetchFriends();
			await fetchFriendRequests();
			await fetchBlockList();

			$chatSocket.on('newMessage', (username: string, message: string, channelId: string) => {
				if ($chatMessages[channelId]) {
					$chatMessages[channelId].push({message: message, username: username});
					$chatMessages[channelId] = $chatMessages[channelId];
				}
			});

			$chatSocket.on('joinRoom', (channelId: string) => {
				if (!$chatMessages[channelId]) {
					$chatMessages[channelId] = [];
				}
			});

			$eventsSocket.on("user-connected", (username: string) => {
				$friends = $friends.map(friend => {
					if (friend.profile.username === username) {
						friend.isConnected = true;
					}
					return friend;
				});
			});

			$eventsSocket.on("user-disconnected", (username: string) => {
				$friends = $friends.map(friend => {
					if (friend.profile.username === username) {
						friend.isConnected = false;
					}
					return friend;
				});
			});

			$eventsSocket.on("receive-friend-request", async (data: { id: number, creatorUsername: string }) => {
				const creatorProfile = await fetchProfile(data.creatorUsername);
				const newFriendRequest: FriendRequest = { id: data.id, creator: creatorProfile };
				const newNotification: Notification = { type: "friend-request", data: newFriendRequest };
				$notifications = [...$notifications, newNotification];
				$friendRequests = [...$friendRequests, newFriendRequest];
			});
	
			$eventsSocket.on("receive-game-request", async (username: string) => {
				const creatorProfile = await fetchProfile(username);
				const newGameRequest: GameRequest = { creator: creatorProfile };
				const newNotification: Notification = { type: "game-request", data: newGameRequest };
				$notifications = [...$notifications, newNotification];
			});

			$eventsSocket.on("friend-request-accepted", async (username: string) => {
				try {
					const newFriendProfile = await fetchProfile(username);
					const newFriend = {
						isConnected: await isUserConnected(username),
						isInGame: await isUserInGame(username),
						profile: newFriendProfile
					}
					$friends = [...$friends, newFriend];
				} catch (err) {
					console.log(err);
				}
			});

			$eventsSocket.on("friend-removed", (username: string) => {
				$friends = $friends.filter(friend => friend.profile.username !== username);
			});

			$eventsSocket.on("user-joined-game", (username: string) => {
				console.log("user-joined-game", username);
				$friends = $friends.map(friend => {
					if (friend.profile.username === username) {
						friend.isInGame = true;
					}
					return friend;
				});
			});

			$eventsSocket.on("user-left-game", (username: string) => {
				console.log("user-left-game", username);
				$friends = $friends.map(friend => {
					if (friend.profile.username === username) {
						friend.isInGame = false;
					}
					return friend;
				});
			});
		} catch (err) {
			console.log(err);
		}
	});
</script>

{#if $user}
	<slot/>
{:else}
	<LoginPage/>
{/if}
