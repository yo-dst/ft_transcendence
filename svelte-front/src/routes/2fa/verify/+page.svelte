<script lang="ts">
	import { goto, invalidate } from "$app/navigation";
    import { loginUserWithTwoFactorAuthentication } from "$lib/api";

	let code = "";
	let error = "";

	async function verifyCode() {
		try {
			await loginUserWithTwoFactorAuthentication(code);
			error = "";
			goto("http://localhost:3000/2fa/redirect");
		} catch (err) {
			error = err.message;
		}
	}
</script>

<h3>Google Authenticator code</h3>
<input name="code" bind:value={code} />
{#if error}
	<span class="error">{error}</span>
{/if}
<button on:click={verifyCode}>Verify</button>

<style>
	.error {
		margin-top: -0.5rem;
		margin-bottom: 1.5rem;
	}
</style>
