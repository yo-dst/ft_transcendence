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
	<div class="notif">
		<ul>
			{#each notifications as notif}
				<li>
					{notif.type}
					{notif.user}
				</li>
			{/each}
		</ul>
	</div>
{/if}

<style>
	.notif {
		background-color: #090D10;
	}
</style>




