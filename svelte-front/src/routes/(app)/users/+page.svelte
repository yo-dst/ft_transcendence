<script lang="ts">
    import { goto } from "$app/navigation";
    import ChatModal from "$lib/components/ChatModal.svelte";
	import { eventsSocket } from "$lib/stores/events-socket";
    import { onMount } from "svelte";

	let show = false;
	const setShow = (value: boolean) => { show = value; };
	let users: string[] = [];
	let username: string;

	onMount(() => {
		if (!$eventsSocket) {
			goto("/login");
		} else {
			$eventsSocket.emit("get-users", (data: string[]) => {
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
	});	
</script>

<section>
	<h3>Users logged in</h3>
	<ul>
		{#each users as user}
			<li on:click|stopPropagation={() => { setShow(true); username = user; }} on:keypress>
				{user}
			</li>
		{/each}
	</ul>
	<ChatModal {show} {setShow} {username}/>
</section>

<style>
	li {
		cursor: pointer;
	}
</style>