<script lang="ts">
	import { user } from "$lib/stores/user";
	import { goto } from "$app/navigation";
	import { onMount } from "svelte";
    import { logoutUser, turnOffTwoFactorAuthentication, updateUserAvatar, updateUserUsername } from "$lib/api";
    import ModalBlockedUser from "$lib/components/ModalBlockedUser.svelte";

	let newUsername = "";
	let files: any;
	let isTwoFactorAuthenticationEnabled: boolean;
	let showBlockedModal = false;
	let updateUsernameError = "";
	let updateAvatarError = "";
	
	async function updateUsername() {
		try {
			await updateUserUsername(newUsername);
			updateUsernameError = "";
		} catch (err) {
			updateUsernameError = err.message;
		}
	}

	async function updateAvatar() {
		try {
			const reader = new FileReader();
			reader.addEventListener("load", async () => {
				const newAvatar = reader.result;
				if (typeof newAvatar !== "string") {
					throw "Error: can't load image";
				}
				await updateUserAvatar(newAvatar);
				updateAvatarError = "";
			});

			if (files && files[0]) {
				reader.readAsDataURL(files[0]);
			}
		} catch (err) {
			updateAvatarError = err.msg;
		}
	}

	async function toggleTwoFactorAuthentication() {
		if (isTwoFactorAuthenticationEnabled) {
			goto("/2fa/activate");
		} else {
			try {
				await turnOffTwoFactorAuthentication();
			} catch (err) {
				isTwoFactorAuthenticationEnabled = true;
				console.log(err);
			}
		}
	}

	async function logout() {
		try {
			await logoutUser();
		} catch (err) {
			console.log(err);
		}
	}

	onMount(() => {
		newUsername = $user.profile.username;
		isTwoFactorAuthenticationEnabled = $user.isTwoFactorAuthenticationEnabled;
	});
</script>

<section>
	<h3>Modify your account</h3>

	<label for="username">Username</label>
	<div class="input-button-container">
		<input name="username" bind:value={newUsername} />
		<button on:click={updateUsername}>Update</button>
	</div>
{#if updateUsernameError}
	<p class="error">{updateUsernameError}</p>
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
	<span class="error">{updateAvatarError}</span>
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

<button style="width:40%; margin:0" on:click={() => {showBlockedModal = true}}>Block list</button>
{#if showBlockedModal}
	<ModalBlockedUser closeModal={() => {showBlockedModal = false}}/>
{/if}

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
