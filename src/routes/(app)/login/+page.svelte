<script lang="ts">
	let username: string;
	let password: string;
</script>

<section>
	<form>
		<label for="username">Username</label>
		<input type="text" name="username" placeholder="Username" bind:value={username} required/>
	
		<label for="password">Password</label>
		<input type="text" name="password" placeholder="Password" bind:value={password} required/>
	
		<button type="submit">Log In</button>
	</form>
	<div class="register-block">
		<p>Not registered yet? <a href="/register">Sign Up</a></p>
	</div>
	<div class="separator">
		<span></span>
		<span class="separator-text">OR</span>
		<span></span>
	</div>
	<a href="/" role="button" class="contrast outline login-with-42-link">Log In with 42</a>
</section>

<style>
	.separator {
		display: flex;
		align-items: center;
	}

	.separator > :first-child, .separator > :last-child {
		background-color: #FFF;
		flex-grow: 1;
		height: 0.01rem;
	}

	.separator-text {
		padding: 0 1.5rem;
	}

	.login-with-42-link {
		margin-top: 1.1rem;
		width: 100%;
	}

	.register-block {
		margin-top: -0.5rem;
		display: flex;
		justify-content: center;
	}
</style>