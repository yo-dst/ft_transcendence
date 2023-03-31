<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { user } from '$lib/stores/user';

	export let data: PageData;

	const matchHistory = data.matchHistory;
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

	onMount(async () => {
		if (!$user.isLoggedIn) {
			goto("/login");
		} else {
			
		}
	});
</script>

<section>
	<div class="user">
		<img src={$user.profile?.avatar?.url} alt="avatar"/>
		<div class="user-stats">
			<span>{$user.profile?.username}</span>
			<div>
				<span style="color: var(--ins-color);;">{nbWin}</span>
				/
				<span style="color: var(--color);">{nbTie}</span>
				/
				<span style="color: var(--del-color);;">{nbLose}</span>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="bg-light-dark table-match-history">
		<h3>Match history</h3>
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
				{#each matchShowed as match (match.id)}
					<tr>
						<td class="opponent-cell">
							<span>{match.opponent}</span>
						</td>
						<td class="result-cell">
							<div style="display: flex; flex-direction: column; min-width: 1.5em">
								<span>{match.result.myPoints}</span>
								<span>{match.result.opponnentPoints}</span>
							</div>
							{#if match.result.myPoints > match.result.opponnentPoints}
								<iconify-icon icon="material-symbols:check-small-rounded" style="color: var(--ins-color); font-size: 2rem;"/>
							{:else if match.result.myPoints < match.result.opponnentPoints}
								<iconify-icon icon="ic:round-close" style="color: var(--del-color); font-size: 1.5rem; margin-left: 0.3rem;"/>
							{:else}
								<iconify-icon icon="ic:round-minus" style="color: var(--color); font-size: 1.5rem; margin-left: 0.3rem;"/>
							{/if}
						</td>
						<td>
							<span style="white-space: nowrap;">
								{match.date.toDateString()}
							</span>
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
	</div>
</section>

<style>
	section {
		/* border: 1px solid white; */
	}

	.user {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.user img {
		width: 50%;
		height: auto;
		border-radius: 50%;
		object-fit: cover;
		aspect-ratio: 1/1;
	}

	.user-stats {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h3 {
		margin-bottom: 1rem;
		font-weight: normal;
		margin-left: 0.5rem;
	}

	.table-match-history {
		padding: 0.5rem 1rem 0rem 0.5rem;
		border-radius: 0 0 5px 5px;
	}

	figure {
		margin-bottom: -0.5rem;
	}

	thead {
		border: none;
	}

	.opponent-cell {
		
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
</style>
