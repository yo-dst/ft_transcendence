<script lang="ts">
	import "@picocss/pico";
	import "../../app.css";
	import 'iconify-icon';
	import Navbar from "$lib/Navbar.svelte";
</script>

<header>
	<Navbar/>
</header>
<main class="container">
	<slot/>
</main>
<footer>
	<div>
		<span>Made with Love by <a href="https://github.com/NoahFerre">Him</a>, <a href="https://github.com/yo-dst">I</a> and <a href="https://fr.wikipedia.org/wiki/Angelina_Jolie">Her </a></span>
	</div>
</footer>

<style>
	header {
		margin-bottom: 50px;
	}

	main {
		margin-bottom: 100px;
	}

	footer {
		position: absolute;
		height: 50px;
		left: 0;
		bottom: 0;
		width: 100%;
		background-color: var(--contrast);;
		display: flex;
		justify-content: center;
		align-items: center;
		color: black;
	}
</style>
