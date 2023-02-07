<svelte:head>
	<script src="https://kit.fontawesome.com/5eedb5e411.js" crossorigin="anonymous"></script>
</svelte:head>

<script lang="ts">
	import "../app.css";
	import "@picocss/pico";
	import Footer from "$lib/Footer.svelte";
	import Navbar from "$lib/Navbar.svelte";
</script>

<div class="main">
	<a href="/">Go To Main Page</a>
	<a href="/profile">Go To Profile Page</a>
	<Navbar/>
	<div class="page">
		<slot></slot>
	</div>
	<Footer/>
</div>

<style>
	.main {
		background-color: rgb(209, 82, 82);
	}
</style>