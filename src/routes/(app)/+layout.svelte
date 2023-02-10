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
	<h1>Footer</h1>
</footer>
