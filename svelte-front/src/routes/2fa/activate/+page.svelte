<script lang="ts">
  import { goto } from "$app/navigation";
  import CanvasQrCode from "$lib/CanvasQrCode.svelte";
  import { onMount } from "svelte";
  import { user } from "../../../stores";

	let qrCodeData = "";
	let code = "";
	let err: any = null;

	async function verifyCode() {
		const res = await fetch("http://localhost:3000/2fa/turn-on", {
			method: "post",
			credentials: "include",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				twoFactorAuthenticationCode: code
			})
		});
		if (res.ok) {
			// try to delete these 2 lines to see if user get fetched after goto()
			if ($user) {
				$user.isTwoFactorAuthenticationEnabled = true;
			}
			goto("/2fa/verify");
		} else {
			const data = await res.json();
			err = data;
		}
	}

	onMount(async () => {
		const res = await fetch("http://localhost:3000/2fa/generate", {
			method: "post",
			credentials: "include"
		});
		if (res.ok) {
			const data = await res.text();
			qrCodeData = data;
		}
	});
</script>

<main>
	<h1>Scan this QR code to add this website to your Google Authenticator application</h1>
	<CanvasQrCode {qrCodeData}
		width={300}
		height={300}
	/>
	<label for="code">Google Authenticator code</label>
	<input name="code" bind:value={code}/>
	<button type="submit" on:click={verifyCode}>Verify code</button>
	{#if err}
		<pre>{JSON.stringify(err, undefined, 2)}</pre>
	{/if}
</main>