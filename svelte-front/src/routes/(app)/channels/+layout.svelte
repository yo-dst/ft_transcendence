<script>
    import { user } from "$lib/stores/user";
    import { io } from "socket.io-client";
    import { onMount, setContext } from "svelte";
    import SocketContext from "./SocketContext.svelte";


    let isMounted = false;
	let socket; 

    onMount(() => {
        socket = io("localhost:3000/chat", {auth: {username: $user.profile?.username}});
	    setContext(SocketContext, socket);
        isMounted = true;
    })
</script>

{#if isMounted}
    <slot/>
{/if}