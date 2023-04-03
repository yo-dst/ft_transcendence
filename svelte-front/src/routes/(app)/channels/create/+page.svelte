<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Socket } from "socket.io-client";
    import { getContext } from "svelte";
    import SocketContext from "../SocketContext.svelte";

	let name: string;
	let password: string;
	let capacity = 25;
	const socket: Socket = getContext(SocketContext);

	function createRoom() {
		socket.emit('createRoom', name, capacity, password, (id: string) => {
			goto(id);
		});
	}
</script>

<section>
	<form>
		<label for="name">Name</label>
		<input
			type="text"
			name="name"
			placeholder="Name"
			bind:value={name}
			required
		/>

		<label for="size"
			>Capacity <kbd style="margin-left: 0.5rem;">{capacity}</kbd></label
		>
		<input
			type="range"
			min="1"
			max="50"
			bind:value={capacity}
			name="capacity"
		/>
		<label for="password">Password</label>
		<input
			type="text"
			name="password"
			placeholder="Password"
			bind:value={password}
		/>
		<small>Leave it empty if you want a public channel</small>

		<button
			type="submit"
			on:click={createRoom}>Create channel</button
		>
	</form>
</section>

<style>
	button {
		margin-top: 1.5rem;
	}
</style>
