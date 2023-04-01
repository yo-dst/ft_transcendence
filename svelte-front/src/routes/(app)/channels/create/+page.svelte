<script lang="ts">
	import { goto } from "$app/navigation";

	let name: string;
	let password: string;
	let capacity = 25;
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
			on:click={() => {
				goto("/channels/1");
			}}>Create channel</button
		>
	</form>
</section>

<style>
	button {
		margin-top: 1.5rem;
	}
</style>
