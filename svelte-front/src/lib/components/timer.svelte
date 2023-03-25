<script lang="ts">
	import { getIcon } from "iconify-icon";
	import { onDestroy } from "svelte";

	export function toggleOff();
	export let socket;

	let timeLeft = 6;

	socket.on("decrTimer", (counter: any) => {
		timeLeft = counter;
	});

	onDestroy(() => {
		socket.emit("destroyTimer");
	});
</script>

{#if timeLeft > 0}
	<div>
		{timeLeft > 1 ? timeLeft - 1 : "GO!"}
	</div>
{/if}

<style>
	div {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		font-size: 4rem;
		opacity: 70%;
		color: rgb(79, 79, 79);
	}
</style>
