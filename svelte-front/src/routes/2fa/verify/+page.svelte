<script lang="ts">
	import { goto } from "$app/navigation";

	let code = "";
	let err: any;

	async function verifyCode() {
		const res = await fetch("http://localhost:3000/2fa/login", {
			method: "post",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				twoFactorAuthenticationCode: code,
			}),
		});
		if (res.ok) {
			goto("/login");
		} else {
			const data = await res.json();
			err = data;
		}
	}
</script>

<label for="code">Google Authenticator code</label>
<input name="code" bind:value={code} />
<button on:click={verifyCode}>Verify</button>
{#if err}
	<pre>{JSON.stringify(err, undefined, 2)}</pre>
{/if}
