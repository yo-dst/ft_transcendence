<script lang="ts">
	let isSearching = false;

	function match() {
		isSearching = !isSearching;
	}
</script>

<section>
	{#if !isSearching}
		<button on:click={match}>Find match</button>
	{:else}
		<button on:click={match}>Leave</button>
	{/if}
	<button>Play vs friends</button>
</section>

<style>
</style>
