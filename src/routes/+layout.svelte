<svelte:head>
	<script src="https://kit.fontawesome.com/5eedb5e411.js" crossorigin="anonymous"></script>
</svelte:head>

<script lang="ts">
	import "@picocss/pico";
	import "../app.css";
	import 'iconify-icon';
	import Navbar from "$lib/Navbar.svelte";
</script>

<header>
	<h1>Header</h1>
	<Navbar/>
</header>
<main>
	<slot></slot>
</main>
<footer>
	<h1>Footer</h1>
</footer>

<style>

</style>