<script>
    import { chatSocket } from "$lib/stores/chat-socket";
    import { user } from "$lib/stores/user";
    import { io } from "socket.io-client";
    import { onMount } from "svelte";

	let hasMounted = false;

	onMount(() => {
		$chatSocket = io("localhost:3000/chat", { auth: { username: $user.profile?.username } });
		
		$chatSocket.on('loaded', () => {
			hasMounted = true;
		});
	})
</script>

{#if hasMounted}
	<slot />
{/if}