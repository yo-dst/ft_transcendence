<script lang="ts">
	const matchHistory = [
		{
			opponent: "nferre",
			win: true,
			result: {
				opponnentPoints: 6,
				myPoints: 7
			},
			date: new Date().toDateString()
		},
		{
			opponent: "mlecherb",
			win: true,
			result: {
				opponnentPoints: 5,
				myPoints: 8
			},
			date: new Date().toDateString()
		},
		{
			opponent: "ydanset",
			win: false,
			result: {
				opponnentPoints: 14,
				myPoints: 6
			},
			date: new Date().toDateString()
		},
		{
			opponent: "prout",
			win: false,
			result: {
				opponnentPoints: 4,
				myPoints: 0
			},
			date: new Date().toDateString()
		}
	]
</script>

<div class="main">
	Profile Page
	<div class="presentation">
		<img src="https://picsum.photos/500/500" alt="profile" class="profile-img"/>
		<div>Username</div>
	</div>
	<div class="match-history">
		<h3>Match History</h3>
		{#each matchHistory as match, key}
			<div class="match">
				<div>{match.opponent}</div>
				{#if match.win}
					<i class="fa-solid fa-check"></i>
				{:else}
					<i class="fa-solid fa-xmark"></i>
				{/if}
				<div>{match.result.myPoints} / {match.result.opponnentPoints} {match.date}</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.main {
		background-color: aqua;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.presentation {
		background-color: bisque;
		display: flex;
		align-items: center;
	}

	.profile-img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
	}

	.match-history {

	}

	.match {
		display: flex;
	}
</style>