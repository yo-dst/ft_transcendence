<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { user } from "$lib/stores/user";
	import { io } from "socket.io-client";

	$: console.log("user logged in", $user?.profile);

	let hasMounted = false;

	onMount(async () => {
		console.log("main layout mounting...");

		let res = await fetch("http://localhost:3000/auth", {
			credentials: "include",
		});
		let data = await res.json();
		console.log("http://localhost:3000/auth response", data);

		res = await fetch("http://localhost:3000/user", {
			credentials: "include",
		});
		data = await res.json();
		if (res.ok) {
			$user.isLoggedIn = true;
			$user.profile = data.profile;
			$user.id = data.id;
			$user.socket = io("localhost:3000");
		} else {
			console.log("b4 goto login");
			goto("/login");
		}

		hasMounted = true;
	});
</script>

{#if hasMounted}
	<slot />
{/if}
