<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { user } from "$lib/stores/user";
	import type { Match } from "$lib/types/match";

	let nbWin = 0;
	let nbLose = 0;
	let index = 0;
	let matches: Match[] = [];

	function getStat(matches: Match[]) {
		matches.forEach((match) => {
			if (match.winner.id === $user.id) nbWin++;
			else nbLose++;
		});
	}

	async function loadMore() {
		let res = await fetch(
			`http://localhost:3000/game?startIndex=${index}&pageSize=${5}&id=${
				$user.id
			}`
		);
		index += 5;
		let data = await res.json();
		matches = [...matches, ...data];
		getStat(matches);
	}

	onMount(async () => {
		if (!$user.isLoggedIn) {
			goto("/login");
		}
		loadMore();
	});
</script>

<section class="first-section">
	<img src={$user.profile?.avatar?.url} alt="profile" class="user-img" />
	<div class="first-section-stats">
		<span>{$user.profile?.username}</span>
		<div>
			<span style="color: var(--ins-color);;">{nbWin}</span>
			/
			<span style="color: var(--color);">0</span>
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
					<th>Opponent</th>
					<th>Result</th>
					<th>Date</th>
				</tr>
			</thead>
			<tbody>
				{#each matches as match}
					<tr>
						<td>
							<div class="opponent-cell">
								<span
									>{match.winner.id != $user.id
										? match.winner.profile.username
										: match.loser.profile.username}</span
								>
							</div>
						</td>
						<td class="result-cell">
							<div
								style="display: flex; flex-direction: column; min-width: 1.5em"
							>
								<span
									>{match.winner.id == $user.id
										? match.scoreWinner
										: match.scoreLoser}</span
								>
								<span
									>{match.winner.id != $user.id
										? match.scoreWinner
										: match.scoreLoser}</span
								>
							</div>
							{#if (match.winner.id == $user.id ? match.scoreWinner : match.scoreLoser) > (match.winner.id != $user.id ? match.scoreWinner : match.scoreLoser)}
								<iconify-icon
									icon="material-symbols:check-small-rounded"
									style="color: var(--ins-color); font-size: 2rem;"
								/>
							{:else if (match.winner.id == $user.id ? match.scoreWinner : match.scoreLoser) < (match.winner.id != $user.id ? match.scoreWinner : match.scoreLoser)}
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
								>{new Date(match.createdAt).toDateString()}
								{new Date(
									new Date(match.createdAt).getTime() +
										7200000
								).toLocaleTimeString("fr-MC")}
							</span>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</figure>
	{#if index === matches.length}
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

	.user-img {
		width: 100%;
		height: auto;
		border-radius: 50%;
		object-fit: cover;
		aspect-ratio: 1/1;
	}

	.first-section-stats {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.opponent-cell {
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

		.user-img {
			width: 50%;
		}
	}
</style>
