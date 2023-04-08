<script lang="ts">
	import "@picocss/pico";
	import "../app.css";
	import 'iconify-icon';
	import { onMount } from "svelte";
	import { user } from "$lib/stores/user";
	import { eventsSocket } from "$lib/stores/events-socket";
	import { notifications } from "$lib/stores/notifications";
	import { io } from "socket.io-client";
    import { fetchBlockList, fetchFriendRequests, fetchFriendsProfile, fetchProfile, loginUser } from "$lib/api";
    import LoginPage from "$lib/components/LoginPage.svelte";
    import type { Notification } from "$lib/types/notification";
    import type { FriendRequest } from "$lib/types/friend-request";
    import { friendRequests } from "$lib/stores/friend-requests";
    import { friendsProfile } from "$lib/stores/friends-profile";
    import { chatSocket } from "$lib/stores/chat-socket";
    import { chatMessages } from "$lib/stores/chat-messages";

	$: console.log("user connected :d", $user);

	onMount(async () => {
		try {
			await loginUser();
			await fetchFriendsProfile();
			await fetchFriendRequests();
			await fetchBlockList();
			
			$eventsSocket = io("http://localhost:3000/events", {
				auth: {
					username: $user.profile.username
				}
			});
			$chatSocket = io("localhost:3000/chat", { auth: { username: $user.profile?.username } });
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
			})
			fetchBlockList();
			$eventsSocket.on("receive-friend-request", async (data: { id: number, creatorUsername: string }) => {
				const creatorProfile = await fetchProfile(data.creatorUsername);
				const newFriendRequest: FriendRequest = { id: data.id, creator: creatorProfile };
				const newNotification: Notification = { type: "friend-request", data: newFriendRequest };
				$notifications = [...$notifications, newNotification];
				$friendRequests = [...$friendRequests, newFriendRequest];
			});
	
			$eventsSocket.on("receive-game-request", (data: any) => {
				$notifications = [...$notifications, { type: "game-request", data }];
			});

			$eventsSocket.on("friend-request-accepted", async (username: string) => {
				try {
					const newFriendProfile = await fetchProfile(username);
					$friendsProfile = [...$friendsProfile, newFriendProfile];
				} catch (err) {
					console.log(err);
				}
			});

			$eventsSocket.on("friend-removed", (username: string) => {
				$friendsProfile = $friendsProfile.filter(profile => profile.username !== username);
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
