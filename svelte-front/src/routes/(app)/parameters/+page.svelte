<script lang="ts">
	import { user } from "$lib/stores/user";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let username: string;
	let usernameError: any;
	let files: any;
	let avatarError: any;
	let isTwoFactorAuthenticationEnabled: boolean;

	async function updateUsername() {
		const res = await fetch(`http://localhost:3000/users/${$user.id}/username`, {
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

	async function updateAvatar() {
		const reader = new FileReader();
		reader.addEventListener("load", async () => {
			let avatar: string = reader.result;
			const res = await fetch(`http://localhost:3000/users/${$user.id}/avatar`, {
				method: "PATCH",
				credentials: "include",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					newAvatar: avatar
				})
			});
			if (res.ok) {
				$user.avatar = avatar;
				avatarError = null;
			} else {
				const data = await res.json();
				avatarError = data;
			}
		});
		if (files && files[0]) {
			reader.readAsDataURL(files[0]);
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
		if (!$user) {
			goto("/login");
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
		<input name="username" bind:value={username}/>
		<button on:click={updateUsername}>Update</button>
	</div>
	{#if usernameError}
		<pre>{JSON.stringify(usernameError, undefined, 2)}</pre>
	{/if}

	<label for="avatar">Avatar
	</label>
	<div>
		<input name="avatar" type="file" bind:files accept="image/png image/jpeg image/jpg"/>
		<button on:click={updateAvatar}>Update</button>
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
