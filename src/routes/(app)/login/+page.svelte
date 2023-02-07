<h1>Login Page</h1>
<form>
	<label for="username">Username</label>
	<input type="text" name="username" placeholder="Username" required/>

	<label for="password">Password</label>
	<input type="text" name="password" placeholder="Password" required/>

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
<a href="/" role="button" class="contrast login-with-42-link">Log In with 42</a>

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