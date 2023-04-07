<script lang="ts">
    import { blockUser, fetchProfile, sendFriendRequest, unblockUser } from "$lib/api";
    import { chatSocket } from "$lib/stores/chat-socket";
    import { user } from "$lib/stores/user";
    import type { Profile } from "$lib/types/profile";
    import { onDestroy, onMount } from "svelte";

	export let setShow: any;
	export let username: string;
	export let isAdmin: boolean;
	export let channelId: string | undefined;

	let userProfile: Profile;
	let userIsFriend: boolean;

	function handleClickOutside(event: any) {
    	if (!event.target.closest('#chat-modal')) {
			setShow(false);
		}
  	}

	onMount(async () => {
		console.log("username", username);
		document.addEventListener("click", handleClickOutside);

		userProfile = await fetchProfile(username);
		console.log(userProfile);
	});

	onDestroy(() => {
		document.removeEventListener("click", handleClickOutside);
	});
</script>

<dialog open={true}>
	<article id="chat-modal">
		<header>
			<img src={userProfile?.avatar?.url} alt="avatar"/>
			<span class="safe-words">{userProfile?.username}</span>
		</header>
		{#if isAdmin}
			<button on:click={() => $chatSocket.emit('newAdmin', channelId, username)}>Set as admin</button>
		{/if}
		{#if !userIsFriend}
			<button on:click={() => sendFriendRequest(userProfile?.username)}>Send friend request</button>
		{/if}
		{#if $user.blocked.every((blockedProfile) => (userProfile === blockedProfile))}
			<button on:click={() => blockUser(userProfile.username)}>Block</button>
		{:else}
			<button on:click={() => unblockUser(userProfile.username)}>Unblock</button>
		{/if}
	</article>
</dialog>

<style>
	header img {
		border-radius: 50%;
        width: 35%;
        height: auto;
        object-fit: cover;
        aspect-ratio: 1/1;
	}
</style>