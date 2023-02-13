<script lang="ts">
	let username: string;
	let password: string;
	let confirmPassword: string;
</script>

<section>
	<form>
		<label for="username">
			Username
			<input type="text" name="username" placeholder="Username" bind:value={username}/>
		</label>
	
		<label for="password">
			Password
			<input type="text" name="password" placeholder="Password" bind:value={password}/>
		</label>
	
		<label for="confirmPassword">
			Confirm Password
			<input type="text" name="confirmPassword" placeholder="Confirm Password" bind:value={confirmPassword}/>
		</label>
	
		<label for="terms_sharing">
			<input type="checkbox" name="terms_sharing">
			I agree to share my information with the entire world
		</label>
	
		<button type="submit">Register</button>
	</form>
</section>

<style>
	button {
		margin-top: 1rem;
	}
</style>