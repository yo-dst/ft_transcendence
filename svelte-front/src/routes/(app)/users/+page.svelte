<script lang="ts">
    import { goto } from "$app/navigation";
    import { user } from "$lib/stores/user";
	import { eventsSocket } from "$lib/stores/events-socket";
    import { onMount } from "svelte";

	let users: string[] = [];

	onMount(() => {
		if (!$eventsSocket) {
			goto("/login");
		} else {
			$eventsSocket.emit("get-users", (data: string[]) => {
				console.log("data", data);
				users = data;
			});
			
			$eventsSocket.on("user-connected", (data: string) => {
				users = [...users, data];
			});

			$eventsSocket.on("user-disconnected", (data: string) => {
				const index = users.findIndex(x => x === data);
				if (index !== -1) {
					users.splice(index, 1);
					users = users;
				}
			});
		}
	})
</script>

<section>
	<h3>Users logged in</h3>
	<ul>
	{#each users as user}
		<li>{user}</li>
	{/each}
	</ul>
</section>
