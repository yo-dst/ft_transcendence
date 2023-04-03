<script>
    import { user } from "$lib/stores/user";
    import { io } from "socket.io-client";
    import { setContext } from "svelte";
    import SocketContext from "./SocketContext.svelte";


	const socket = io("localhost:3000/chat", {auth: {username: $user.profile?.username}});
	setContext(SocketContext, socket);
</script>

<slot/>