<script>
	
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