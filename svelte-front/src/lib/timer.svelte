<script>
	import { onMount, onDestroy } from "svelte";

	let timeLeft = 6;
	/**
	 * @type {string | number | NodeJS.Timer | undefined}
	 */
	let timer;

	function startTimer() {
		timer = setInterval(() => {
			timeLeft--;
			if (timeLeft === 0) {
				clearInterval(timer);
			}
		}, 1000);
	}

	onMount(() => {
		startTimer();
	});

	onDestroy(() => {
		clearInterval(timer);
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
