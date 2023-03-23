<script lang="ts">
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
	import { user } from "../stores";

	$: console.log("user logged in", $user);

	onMount(async () => {
		const res = await fetch("http://localhost:3000/auth", {
			credentials: "include",
		});
		if (res.ok) {
			const data = await res.json();
			$user = data;
			console.log($user);
		} else {
			$user = undefined;
			goto("/");
		}
	});
</script>

<slot />
