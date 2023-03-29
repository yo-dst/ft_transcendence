<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;

	const matchHistory = data.matchHistory;
	let username = "Walachnibar";
	let nbWin = 3;
	let nbLose = 2;
	let nbTie = 1;

	let matchShowed = matchHistory.slice(0, 5);

	function loadMore() {
		if (matchShowed.length < matchHistory.length) {
			const matchAdded = matchHistory.slice(
				matchShowed.length,
				matchShowed.length + 5
			);
			matchShowed = [...matchShowed, ...matchAdded];
		}
	}
</script>

<section class="first-section">
	<img
		src="https://picsum.photos/500/500"
		alt="profile"
		class="first-section-img"
	/>
	<div class="first-section-stats">
		<span>{username}</span>
		<div>
			<span style="color: var(--ins-color);;">{nbWin}</span>
			/
			<span style="color: var(--color);">{nbTie}</span>
			/
			<span style="color: var(--del-color);;">{nbLose}</span>
		</div>
	</div>
</section>
<section class="second-section">
	<div class="match-history-title">Match history</div>
	<figure>
		<table>
			<thead>
				<tr>
					<th>Players</th>
					<th>Result</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{#each matchShowed as match (match.id)}
					<tr>
						<td>
							<div class="players-cell">
								<span>{username}</span>
								<span>{match.opponent}</span>
							</div>
						</td>
						<td class="result-cell">
							<div
								style="display: flex; flex-direction: column; min-width: 1.5em"
							>
								<span>{match.result.myPoints}</span>
								<span>{match.result.opponnentPoints}</span>
							</div>
							{#if match.result.myPoints > match.result.opponnentPoints}
								<iconify-icon
									icon="material-symbols:check-small-rounded"
									style="color: var(--ins-color); font-size: 2rem;"
								/>
							{:else if match.result.myPoints < match.result.opponnentPoints}
								<iconify-icon
									icon="ic:round-close"
									style="color: var(--del-color); font-size: 1.5rem; margin-left: 0.3rem;"
								/>
							{:else}
								<iconify-icon
									icon="ic:round-minus"
									style="color: var(--color); font-size: 1.5rem; margin-left: 0.3rem;"
								/>
							{/if}
						</td>
						<td>
							<span style="white-space: nowrap;"
								>{match.date.toDateString()}</span
							>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</figure>
	{#if matchShowed.length < matchHistory.length}
		<div style="display: flex; justify-content: center;">
			<button on:click={loadMore} class="secondary load-more-button">
				<iconify-icon icon="ic:round-plus" style="font-size: 1rem;" />
			</button>
		</div>
	{/if}
</section>

<style>
	figure {
		margin-bottom: -0.5rem;
		border-radius: 0 0 5px 5px;
		background-color: #090d10;
		padding: 0.5rem 1rem 0.5rem 0.5rem;
	}

	thead {
		border: none;
	}

	.first-section {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 2.5rem;
	}

	.first-section-img {
		width: 100%;
		height: auto;
		border-radius: 50%;
	}

	.first-section-stats {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.players-cell {
		display: flex;
		flex-direction: column;
	}

	.result-cell {
		display: flex;
		align-items: center;
	}

	.load-more-button {
		margin-top: -0.5rem;
		width: auto;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0.05rem;
	}

	.match-history-title {
		padding-left: 0.5rem;
		font-size: 1.5rem;
		color: var(--h3-color);
		padding-top: 0.2rem;
		border-radius: 5px 5px 0 0;
		background-color: #090d10;
	}

	@media (max-width: 576px) {
		.first-section {
			flex-direction: column;
			gap: 1rem;
		}

		.first-section-img {
			width: 50%;
		}
	}
</style>
