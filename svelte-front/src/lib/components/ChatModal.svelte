<script lang="ts">
    import { goto } from "$app/navigation";
    import { blockUser, fetchProfile, sendFriendRequest, unblockUser } from "$lib/api";
    import { user } from "$lib/stores/user";
    import type { Profile } from "$lib/types/profile";
    import { onDestroy, onMount } from "svelte";

screenLeft
	export let setShow: any;
	export let username: string;

	let userProfile: Profile;
	let userIsFriend: boolean;
	let youAreAdmin = true;
	let userIsAdmin = false;

	function handleClickOutside(event: any) {
    	if (!event.target.closest('#chat-modal')) {
			setShow(false);
		}
  	}

	onMount(async () => {
		document.addEventListener("click", handleClickOutside);

		userProfile = await fetchProfile(username);
	});

	onDestroy(() => {
		document.removeEventListener("click", handleClickOutside);
	});
</script>

<dialog open={true}>
	<article id="chat-modal">
		<header on:click={() => goto(`/profile/${userProfile?.username}`)} on:keypress>
			<img src={userProfile?.avatar?.url} alt="avatar"/>
			<span class="safe-words">{userProfile?.username}</span>
		</header>
		<body>
			<button on:click={() => {}}>Challenge</button>
			{#if !userIsFriend}
				<button on:click={() => sendFriendRequest(userProfile?.username)}>Friend request</button>
			{/if}
			{#if youAreAdmin && !userIsAdmin}
				<button on:click={() => {}}>Give admin rights</button>
			{/if}
			{#if $user.blocked.every((blockedProfile) => (userProfile === blockedProfile))}
				<button on:click={() => blockUser(userProfile.username)}>Block</button>
			{:else}
				<button on:click={() => unblockUser(userProfile.username)}>Unblock</button>
			{/if}
		</body>
	</article>
</dialog>

<style>
	article {
		padding: 0;
		width: 300px;
	}

	header {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin: 0;
		padding: 1rem;
	}

	header:hover {
		filter: brightness(1.2);
		cursor: pointer;
	}

	header img {
		border-radius: 50%;
		width: 96px;
		height: 96px;
        object-fit: cover;
        aspect-ratio: 1/1;
	}

	body {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
	}

	body button {
		margin-bottom: 0;
	}
</style>