<script lang="ts">
    import { onDestroy, onMount } from "svelte";

screenLeft
	export let show: boolean;
	export let setShow: any;
	export let username: string;

	function handleClickOutside(event: any) {
    	if (!event.target.closest('#chat-modal')) {
			setShow(false);
		}
  	}

	onMount(async () => {
		document.addEventListener("click", handleClickOutside);
		
	});

	onDestroy(() => {
		document.removeEventListener("click", handleClickOutside);
	});
</script>

{#if show}
	<dialog open={show}>
		<article id="chat-modal">
		<header>
			<button class="close" on:click={() => setShow(false)}></button>
			{username}
		</header>
		<p>
			Nunc nec ligula a tortor sollicitudin dictum in vel enim. 
			Quisque facilisis turpis vel eros dictum aliquam et nec turpis. 
			Sed eleifend a dui nec ullamcorper. 
			Praesent vehicula lacus ac justo accumsan ullamcorper.
		</p>
		</article>
	</dialog>
{/if}
