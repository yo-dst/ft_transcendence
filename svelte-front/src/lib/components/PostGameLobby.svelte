<script lang="ts">
    import { goto } from "$app/navigation";

	let userIsWinner = false;
</script>

<div class="post-game-lobby-page">
	<div class="container">
		<h2>
			{#if userIsWinner}
				What a winner!
			{:else}
				You're such a loser...
			{/if}
		</h2>
		<div class="players-wrapper">
			<img src={userProfile.avatar.url} alt="avatar"/>
			<span class="color-win">{userScore}</span>
			<span>-</span>
			<span class="color-lose">{opponentScore}</span>
			<img src={opponentProfile.avatar.url} alt="avatar"/>
		</div>
		<div class="buttons-wrapper">
			<button class="contrast outline" style="margin-bottom: 2rem;" on:click={() => {goto('/')}}>Go back home</button>
		</div>
	</div>
</div>

<style>
	.post-game-lobby-page {
		width: 100vw;
		height: 100vh;
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
