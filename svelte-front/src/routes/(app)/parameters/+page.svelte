<script lang="ts">
	import { user } from "$lib/stores/user";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";

	let username: string | undefined;
	let updateUsernameError: any;
	let files: any;
	let updateAvatarError: any;
	let isTwoFactorAuthenticationEnabled: boolean;

	async function updateUsername() {
		const res = await fetch(
			`http://localhost:3000/user/username`,
			{
				method: "PATCH",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					newUsername: username,
				}),
			}
		);
		const data = await res.json();
		if (res.ok) {
			$user.profile.username = username;
			updateUsernameError = undefined;
		} else {
			updateUsernameError = data;
		}
	}

	async function updateAvatar() {
		const reader = new FileReader();
		reader.addEventListener("load", async () => {
			let avatar: string = reader.result;
			const res = await fetch(
				`http://localhost:3000/user/avatar`,
				{
					method: "PATCH",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						newAvatar: avatar,
					}),
				}
			);
			const data = await res.json();
			if (res.ok) {
				$user.profile.avatar.url = avatar;
				updateAvatarError = undefined;
			} else {
				updateAvatarError = data;
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
			} else {
				isTwoFactorAuthenticationEnabled = true;
			}
		}
	}

	async function logout() {
		const res = await fetch("http://localhost:3000/auth/logout", {
			credentials: "include",
		});
		if (res.ok) {
			$user.isLoggedIn = false;
			$user.profile = undefined;
			goto("/login");
		}
	}

	onMount(() => {
		if (!$user.isLoggedIn) {
			goto("/login");
		} else {
			username = $user.profile?.username;
			isTwoFactorAuthenticationEnabled = $user.isTwoFactorAuthenticationEnabled;
		}
	});
</script>

<section>
	<h3>Modify your account</h3>

	<label for="username">Username</label>
	<div class="input-button-container">
		<input name="username" bind:value={username} />
		<button on:click={updateUsername}>Update</button>
	</div>
{#if updateUsernameError}
	<pre class="error">{JSON.stringify(updateUsernameError, undefined, 2)}</pre>
{/if}

	<label for="avatar">Avatar </label>
	<div class="input-button-container">
		<input
			name="avatar"
			type="file"
			bind:files
			accept="image/png image/jpeg image/jpg"
		/>
		<button on:click={updateAvatar}>Update</button>
	</div>
{#if updateAvatarError}
	<pre class="error">{JSON.stringify(updateAvatarError, undefined, 2)}</pre>
{/if}

	<label for="isTwoFactorAuthenticationEnabled">
		<input
			type="checkbox"
			name="isTwoFactorAuthenticationEnabled"
			role="switch"
			bind:checked={isTwoFactorAuthenticationEnabled}
			on:change={toggleTwoFactorAuthentication}
		/>
	{#if isTwoFactorAuthenticationEnabled}
		<span>Disable two factor authentication</span>
	{:else}
		<span>Enable two factor authentication</span>
	{/if}
	</label>
</section>

<div class="logout-wrapper">
	<h3>Log in with another account</h3>
	<a href="/" role="button" on:click={logout} class="contrast outline">
		<iconify-icon icon="material-symbols:logout" />
		Log out
	</a>
</div>

<style>
	h3 {
		margin-bottom: 1rem;
		font-weight: normal;
	}

	.error {
		margin-top: -1.5rem;
	}

	.logout-wrapper {
		margin-top: 100px;
		display: block;
	}

	.logout-wrapper a {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.5rem;
	}

	.logout-wrapper a:hover {
		background-color: var(--contrast);
		color: black;
	}

	@media (max-width: 700px) {
		.logout-wrapper {
			display: none;
		}
	}
</style>
