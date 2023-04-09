<script lang="ts">
	import { goto } from "$app/navigation";
	import { io, Socket } from "socket.io-client";
	import { user } from "$lib/stores/user";
	import { onMount } from "svelte";
    import PlayVsFriendsModal from "$lib/components/PlayVsFriendsModal.svelte";

	let selectedGameMode = 0;
	let isSearching = false;
	let socket: Socket;
	let show = false;
	const setShow = (value: boolean) => show = value; 

	function joinQueue() {
		socket.emit("joinQueue", selectedGameMode);
		isSearching = !isSearching;
	}

	function leaveQueue() {
		socket.emit("leaveQueue", selectedGameMode);
		isSearching = !isSearching;
	}

	onMount(() => {
		socket = io("localhost:3000/matchmaking", {auth: {userId: $user.id}});

		socket.on("matched", (id) => {
			goto("/game/" + id);
		});
	});
</script>

<section>
	<h3>Game mode</h3>
	<div class="game-mode">
		<button class={selectedGameMode === 0 ? "" : "outline"}
			on:click={() => selectedGameMode = 0}
		>
			🧢 Classic
		</button>
		<button class={selectedGameMode === 1 ? "" : "outline"}
			on:click={() => selectedGameMode = 1}
		>
			⚡ Speed
		</button>
		<button class={selectedGameMode === 2 ? "" : "outline"}
			on:click={() => selectedGameMode = 2}
		>
			👻 Ghost
		</button>
	</div>
</section>

<section>
	<h3>Find game</h3>
	<div class="find-game">
		{#if !isSearching}
			<button on:click={joinQueue}>Play</button>
		{:else}
			<button class="outline" on:click={leaveQueue}>Leave</button>
		{/if}
		<div class="or">
			<span></span>
			<span>or</span>
			<span></span>
		</div>
		<button on:click|stopPropagation={() => setShow(true)}>Play vs friends</button>
	</div>
</section>

{#if show}
	<PlayVsFriendsModal {setShow}/>
{/if}

<style>
	h3 {
		margin-bottom: 1rem;
	}

	.game-mode {
		display: flex;
		gap: 1rem;
	}

	.or {
		padding: 0 2rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 1rem;
	}

	.or > :first-child {
		width: 40%;
		height: 0.5px;
		background-color: white;
		opacity: 0.8;
	}

	.or > :last-child {
		width: 40%;
		height: 0.5px;
		background-color: white;
		opacity: 0.8;
	}
</style>
