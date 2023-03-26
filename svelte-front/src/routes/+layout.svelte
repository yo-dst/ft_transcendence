<!-- 
	to be sure user is fetched before mounting any page we could use the following...
	but it disable ssr capabilities (not recommended)

	let hasMounted = false;

	onMount(() => {
		...
		hasMounted = true;
	})

	{#if hasMounted}
		<slot></slot>
	{/if}
-->
<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { user } from "$lib/stores/user";
	import { io } from "socket.io-client";

	$: console.log("user logged in", $user);

	let hasMounted = false;

	onMount(async () => {
		console.log("main layout mounting...");
		const res = await fetch("http://localhost:3000/auth", {
			credentials: "include",
		});
		if (res.ok) {
			const data = await res.json();
			$user = data;
			$user.socket = io("localhost:3000");
		} else {
			goto("/login");
		}
		hasMounted = true;
	});
</script>

{#if hasMounted}
	<slot />
{/if}
