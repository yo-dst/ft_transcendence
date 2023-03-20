<script lang="ts">
	export let show: boolean;

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
	<ul>
		{#each notifications as notif}
			<li>
				<div>
					{notif.type}
					{notif.user}
				</div>
				<div class="button-wrapper">
					<button class="accept-button">
						<iconify-icon icon="fluent-mdl2:accept-medium"></iconify-icon>
					</button>
					<button class="decline-button">
						<iconify-icon icon="radix-icons:cross-2"></iconify-icon>
					</button>
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	ul {
		position: absolute;
		top: 50px;
		right: 0;
		background-color: #090D10;
		width: 200px;
		padding: 0;
		margin: 0;
	}

	li {
		padding: 1rem;
		margin: 0;
		border-left: 0.05rem solid var(--contrast);
		list-style-type: none;
		border-bottom: 0.05rem solid var(--contrast);
		display: flex;
		justify-content: space-between;
		align-items: center;
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




