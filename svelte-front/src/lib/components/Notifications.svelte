<script lang="ts">
    import type { FriendRequest } from "$lib/types/friend-request";
    import type { GameInvation } from "$lib/types/game-invitation";

	export let show: boolean;
	export let top: number;

	// let notif: (FriendRequest | GameInvation)[];

	let notifications = [
		{
			type: "gameInvit",
			user: "theboss"
		},
		{
			type: "channelInvit",
			user: "zoro"
		}
	];
</script>

{#if show}
	<div class="notifications-container" style="--top:{top}px">
		<ul>
		{#each notifications as notification}
			<li>
				<pre>{JSON.stringify(notification, undefined, 2)}</pre>
			</li>
		{/each}
		</ul>
	</div>
{/if}

<!-- <div class="button-wrapper">
	<button class="accept-button">
		<iconify-icon icon="fluent-mdl2:accept-medium"></iconify-icon>
	</button>
	<button class="decline-button">
		<iconify-icon icon="radix-icons:cross-2"></iconify-icon>
	</button>
</div> -->

<style>
	.notifications-container {
		position: absolute;
		top: var(--top);
		right: 5px;
		background-color: #161b22;
		box-shadow: -5px 5px 5px #0d1117;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	ul li {
		list-style: none;
		margin-bottom: 0.5rem;
	}

	button {
		border: none;
		--primary-focus: transparent;
		margin-bottom: 0;
		padding: 0.4rem;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.button-wrapper {
		display: flex;
		gap: 0.5rem;
		margin-left: 1rem;
	}

	.decline-button {
		background-color: var(--del-color);
	}

	.accept-button {
		background-color: var(--ins-color);
	}
</style>




