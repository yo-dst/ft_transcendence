<svelte:head>
	<script src="https://kit.fontawesome.com/5eedb5e411.js" crossorigin="anonymous"></script>
</svelte:head>

<script lang="ts">
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
	<i class="fa-solid fa-xmark"></i>
</div>

<style>
	.main {
		background-color: beige;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.page {
		background-color: antiquewhite;
		width: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>