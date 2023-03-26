<script lang="ts">
	import { goto } from "$app/navigation";
	import { io } from "socket.io-client";
	import { user } from "$lib/stores/user";

	let selectedGameMode = 0;
	let isSearching = false;

	let socket = io("localhost:3000/matchmaking", {
		query: { email: $user?.email },
	});

	function joinQueue() {
		socket.emit("joinQueue", selectedGameMode);
		isSearching = !isSearching;
	}

	function leaveQueue() {
		socket.emit("leaveQueue", selectedGameMode);
		isSearching = !isSearching;
	}

	socket.on("matched", (id) => {
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
