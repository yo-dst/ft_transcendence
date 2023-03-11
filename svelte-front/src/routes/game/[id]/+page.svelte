<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { User } from "../../(app)/user";
	import Pong from "./pong.svelte";

	let id = $page.params.id;
	let roomExist: boolean = false;

	// verify that room Exist
	$User.socket.emit("checkId", id);

	$User.socket.on("found", () => {
		roomExist = true;
	});
</script>

{#if roomExist}
	<Pong gameMode={0} />
{:else}
	RoomId not found

	<button
		on:click={() => {
			goto("/");
		}}>Go back home</button
	>
{/if}
