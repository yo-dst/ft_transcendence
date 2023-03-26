<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { io } from "socket.io-client";
	import Pong from "./pong.svelte";
	import TurnPhone from "$lib/components/turnPhone.svelte";
	import { waitFlip } from "./pong";
	import { user } from "$lib/stores/user";

	let turnPhone = true;
	let id = $page.params.id;
	let roomExist: boolean = false;
	let gameMode = 0;
	let socket = io("localhost:3000/game", { query: { email: $user.email } });

	// verify that room Exist
	socket.emit("checkId", id);

	socket.on("found", (gamemode) => {
		roomExist = true;
		gameMode = gamemode;
	});

	waitFlip().then((newTurnPhone) => {
		turnPhone = newTurnPhone;
	});
</script>

{#if roomExist && !turnPhone}
	<Pong {gameMode} {socket} />
{:else if turnPhone}
	<TurnPhone />
{:else}
	RoomId not found

	<button
		on:click={() => {
			goto("/");
		}}>Go back home</button
	>
{/if}
