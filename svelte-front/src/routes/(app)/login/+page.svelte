<script lang="ts">
	import { user } from "$lib/stores/user";
	import { onMount } from "svelte";

	async function getFakeUser() {
		const response = await fetch("http://localhost:3000/auth/fakeUser");
		$user = await response.json();
	}

	onMount(() => {
		console.log("login page mounting...");
	});
</script>

<a
	role="button"
	class="contrast outline"
	href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-7470221ce45a9a6950c2b7324e6e5a9a069460af572ce5daa2a0fb547a3d5fda&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin&response_type=code"
>
	<iconify-icon icon="material-symbols:login" />
	Log In
</a>

<button on:click={getFakeUser}>get fake user</button>

<style>
	a {
		display: flex;
		justify-content: center;
	}
</style>
