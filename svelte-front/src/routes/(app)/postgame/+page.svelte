<script lang="ts">
    import { goto } from "$app/navigation";
    import { fetchMatchHistory } from "$lib/api";
    import Loading from "$lib/components/Loading.svelte";
    import { matchSocket } from "$lib/stores/matchmaking-socket";
    import { user } from "$lib/stores/user";
    import type { Match } from "$lib/types/match";
    import type { Profile } from "$lib/types/profile";
    import { sendGameRequest } from "$lib/utils/sendGameRequest";
    import { onMount } from "svelte";
	let userIsWinner = false;
	let userProfile: Profile = {
		username: "gnogno",
		avatar: {
			url: "https://picsum.photos/600"
		},
		wins: 1,
		losses: 1
	}
	let opponentProfile: Profile = {
		username: "gnagna",
		avatar: {
			url: "https://picsum.photos/600"
		},
		wins: 1,
		losses: 1
	}
	let userScore = 10;
	let opponentScore = 3;

	let isSearching = false;
	let match: Match;
	let isLoading = true;

	function joinQueue() {
		$matchSocket.emit("joinQueue", 0);
		isSearching = !isSearching;
	}

	function leaveQueue() {
		$matchSocket.emit("leaveQueue", 0);
		isSearching = !isSearching;
	}

	onMount(async () => {
		try {
			const data = await fetchMatchHistory($user.profile.username, 0, 1);
			match = data[0];
		} catch (err) {
			console.log(err);
		}
		console.log(match);
		isLoading = false;
	})
</script>

{#if isLoading}
<Loading/>
{:else}
<div class="post-game-lobby-page">
	<div class="container">
		<h2>
			{#if match.result === "won"}
				What a winner!
			{:else}
				You're such a loser...
			{/if}
		</h2>
		<div class="players-wrapper">
			<img src={$user.profile.avatar.url} alt="avatar"/>
			<span class="color-win">{match.userScore}</span>
			<span>-</span>
			<span class="color-lose">{match.opponentScore}</span>
			<img src={match.opponentProfile.avatar.url} alt="avatar"/>
		</div>
		<div class="buttons-wrapper">
			{#if !isSearching}
				<button on:click={joinQueue}>Search new game</button>
			{:else}
				<button class="outline" on:click={leaveQueue}>Leave</button>
			{/if}
			<button on:click={() => sendGameRequest(match.opponentProfile.username)}>Ask revanche</button>
			<button class="contrast outline" style="margin-bottom: 2rem;" on:click={() => goto('/')}>Go back home</button>
		</div>
	</div>
</div>
{/if}

<style>
	.post-game-lobby-page {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.container {
		padding: 1rem;
		background-color: #161b22;
		width: 500px;
		max-width: 90vw;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		border-radius: 5px;
	}
	h2 {
		margin-bottom: 0;
	}
	.players-wrapper {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.buttons-wrapper {
		width: 70%;
	}
	img {
		width: 92px;
		height: 92px;
		object-fit: cover;
		aspect-ratio: 1/1;
		border-radius: 50%;
	}
	.color-win {
		color: var(--ins-color);
	}
	.color-lose {
		color: var(--del-color);
	}
</style>