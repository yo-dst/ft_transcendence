<script lang="ts">
    import { onMount } from "svelte";

	onMount(() => {
		console.log("2fa layout mounting...");
	})
</script>

<main>
	<div>
		<slot></slot>
	</div>
</main>

<style>
	main {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	main > div {
		max-width: 500px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>