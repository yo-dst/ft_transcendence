<script lang="ts">
	import { user } from "../../../stores";
	import { goto } from "$app/navigation";

	let username = $user?.username;
	let isTwoFactorAuthenticationEnabled = $user?.isTwoFactorAuthenticationEnabled;

	function toggleTwoFactorAuthentication() {
		if (isTwoFactorAuthenticationEnabled) {
			goto("/2fa/activate");
		}
	}
</script>

<section>
	<h1>Modify your account</h1>



	<form>
		<label for="username">
			Username
		</label>
		<div>
			<input name="username" bind:value={username}/>
			<button>Submit</button>
		</div>
	</form>

	<form>
		<label for="profile-picture">Profile picture</label>
		<div>
			<input name="profile-picture" type="file"/>
			<button>Submit</button>
		</div>
	</form>

	<form>
		<label for="isTwoFactorAuthenticationEnabled">
			<input type="checkbox" 
				name="isTwoFactorAuthenticationEnabled"
				role="switch"
				bind:checked={isTwoFactorAuthenticationEnabled}
				on:change={toggleTwoFactorAuthentication}
			>
			{#if isTwoFactorAuthenticationEnabled}
				Disable two factor authentication
			{:else}
				Enable two factor authentication
			{/if}
		</label>
	</form>
</section>

<style>
	div {
		display: flex;
		gap: 1rem;
	}

	div > button {
		width: auto;
	}
</style>

