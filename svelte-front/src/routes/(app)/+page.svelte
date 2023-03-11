<script lang="ts">
	import { goto } from "$app/navigation";
	import { User } from "./user";

	let selectedGameMode = 0;
	let isSearching = false;

	function joinQueue() {
		$User.socket.emit("joinQueue", selectedGameMode);
		isSearching = !isSearching;
	}

	function leaveQueue() {
		$User.socket.emit("leaveQueue", selectedGameMode);
		isSearching = !isSearching;
	}

	$User.socket.on("game-message", (data) => {
		console.log(data);
	});

	$User.socket.on("matched", (id) => {
		goto("/game/" + id);
	});
</script>

<section>
	{#if !isSearching}
		<button on:click={joinQueue}>Find match</button>
	{:else}
		<button on:click={leaveQueue}>Leave</button>
	{/if}
	<button>Play vs friends</button>
	Game Mode
	<button on:click={() => (selectedGameMode = 0)} disabled={isSearching}
		>{selectedGameMode === 0 ? "✅" : "🧢"} Default</button
	>
	<button on:click={() => (selectedGameMode = 1)} disabled={isSearching}
		>{selectedGameMode === 1 ? "✅" : "⚡"} Speed</button
	>
	<button on:click={() => (selectedGameMode = 2)} disabled={isSearching}
		>{selectedGameMode === 2 ? "✅" : "👻"} Ghost</button
	>
</section>

<style>
</style>
