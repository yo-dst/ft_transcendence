<script lang="ts">
	import "@picocss/pico";
	import "../app.css";
	import 'iconify-icon';
	import { onMount } from "svelte";
	import { user } from "$lib/stores/user";
	import { eventsSocket } from "$lib/stores/events-socket";
	import { notifications } from "$lib/stores/notifications";
	import { io } from "socket.io-client";
    import { fetchFriendsProfile, fetchProfile, loginUser } from "$lib/api";
    import { friendsProfile } from "$lib/stores/friends-profile";
    import type { Notification } from "$lib/types/notification";

	$: console.log("user", $user);

	$: console.log("eventsSocket", $eventsSocket);

	let hasMounted = false;

	onMount(async () => {
		try {
			await loginUser();
			$friendsProfile = await fetchFriendsProfile();
			$eventsSocket = io("http://localhost:3000/events", {
				auth: {
					username: $user.profile?.username
				}
			});
			$eventsSocket.on("receive-friend-request", async (data: { id: number, creatorUsername: string }) => {
				const creatorProfile = await fetchProfile(data.creatorUsername);
				const newNotification: Notification = {
					type: "friend-request",
					data: { id: data.id, creator: creatorProfile }
				};
				$notifications = [...$notifications, newNotification];
			});
			$eventsSocket.on("receive-game-request", (data: any) => {
				$notifications = [...$notifications, { type: "game-request", data }];
			});
		} catch (err) {}

		hasMounted = true;
	});
</script>

{#if hasMounted}
	<slot />
{/if}
