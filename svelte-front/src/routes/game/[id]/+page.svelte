<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { io } from "socket.io-client";

	let id = $page.params.id;
	let roomExist: boolean = false;

	const socket = io("localhost:3000", {
		path: "/game",
		query: { id: id },
	});

	// verify that room Exist
	socket.on("Found", () => {
		roomExist = true;
	});
</script>

{#if roomExist}
	Sorry you cant play yet
{:else}
	RoomId not found
{/if}

<button
	on:click={() => {
		goto("/");
	}}>Go back home</button
>
