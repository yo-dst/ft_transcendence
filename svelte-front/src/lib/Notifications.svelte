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
				<button></button>
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
		list-style-type: none;
		border-bottom: 0.05rem solid var(--contrast);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>




