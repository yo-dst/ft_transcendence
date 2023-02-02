<script lang="ts">
	import Footer from "$lib/Footer.svelte";
	import Navbar from "$lib/Navbar.svelte";
</script>

<div class="main">
	<Navbar/>
	<slot></slot>
	<Footer/>
</div>

<style>
	.main {
		background-color: beige;
	}
</style>