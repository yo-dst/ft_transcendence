<script lang="ts">
    import { goto } from "$app/navigation";

	let username: string;
	let loginError: any;

	function loginWithUsername() {
		goto(`http://localhost:3000/auth/username?username=${username}`);
	}
</script>

<a
	role="button"
	class="contrast outline"
	href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-7470221ce45a9a6950c2b7324e6e5a9a069460af572ce5daa2a0fb547a3d5fda&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin&response_type=code"
>
	<iconify-icon icon="material-symbols:login" />
	Log In
</a>

<input bind:value={username}/>
<button on:click={loginWithUsername}>Login with username</button>
{#if loginError}
	<pre>{JSON.stringify(loginError, undefined, 2)}</pre>
{/if}

<style>
	a {
		display: flex;
		justify-content: center;
		margin-bottom: 5rem;
	}
</style>
