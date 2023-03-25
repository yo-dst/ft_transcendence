<script lang="ts">
	import { user } from "$lib/stores/user";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let username: string;
	let usernameError: any;
	let isTwoFactorAuthenticationEnabled: boolean;

	async function updateUsername() {
		const res = await fetch("http://localhost:3000/users/1/username", {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				newUsername: username,
			}),
		});
		if (res.ok) {
			$user.username = username;
			usernameError = null;
		} else {
			const data = await res.json();
			usernameError = data;
		}
	}

	async function toggleTwoFactorAuthentication() {
		if (isTwoFactorAuthenticationEnabled) {
			goto("/2fa/activate");
		} else {
			const res = await fetch("http://localhost:3000/2fa/turn-off", {
				method: "POST",
				credentials: "include",
			});
			if (res.ok) {
				$user.isTwoFactorAuthenticationEnabled = false;
				// we must delete this line because we wont share 2fa secret on client side
				$user.twoFactorAuthenticationSecret = null;
			} else {
				isTwoFactorAuthenticationEnabled = true;
			}
		}
	}

	onMount(() => {
		console.log("param page mounting...");
		if (!$user) {
			goto("/");
		} else {
			username = $user.username;
			isTwoFactorAuthenticationEnabled =
				$user.isTwoFactorAuthenticationEnabled;
		}
	});
</script>

<section>
	<h1>Modify your account</h1>

	<label for="username"> Username </label>
	<div>
		<input name="username" bind:value={username} />
		<button on:click={updateUsername}>Submit</button>
	</div>
	{#if usernameError}
		<pre>{JSON.stringify(usernameError, undefined, 2)}</pre>
	{/if}

	<label for="profile-picture">Profile picture</label>
	<div>
		<input name="profile-picture" type="file" />
		<button>Submit</button>
	</div>

	<label for="isTwoFactorAuthenticationEnabled">
		<input
			type="checkbox"
			name="isTwoFactorAuthenticationEnabled"
			role="switch"
			bind:checked={isTwoFactorAuthenticationEnabled}
			on:change={toggleTwoFactorAuthentication}
		/>
		{#if isTwoFactorAuthenticationEnabled}
			Disable two factor authentication
		{:else}
			Enable two factor authentication
		{/if}
	</label>
</section>

<style>
	div {
		display: flex;
		gap: 1rem;
		margin-bottom: 1rem;
	}

	div > button {
		width: auto;
	}
</style>
