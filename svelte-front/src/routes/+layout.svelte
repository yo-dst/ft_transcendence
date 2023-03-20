<script lang="ts">
  import { onMount } from "svelte";
	import { user } from "../stores";

	$: console.log("user logged in", $user);

	onMount(async () => {
		const res = await fetch("http://localhost:3000/auth", {
			credentials: "include"
		});
		if (res.ok) {
			const data = await res.json();
			$user = data;
		} else {
			$user = null;
		}
	});
</script>

<!-- <div class="user-container">
	User logged in
	<pre>{JSON.stringify($user, undefined, 2)}</pre>
</div> -->
<slot></slot>

<!-- <style>
	.user-container {
		border: 1px solid black;
	}
</style> -->