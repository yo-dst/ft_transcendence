<script lang="ts">
    import { goto } from "$app/navigation";
    import { chatSocket } from "$lib/stores/chat-socket";


	export let roomId: string | undefined;
	let password: string;
	let showError: boolean = false;

	function sendPassword() {
		$chatSocket.emit('joinRoom', roomId, password, (accepted: boolean) => {
			if (accepted) {
				closeModal();
				goto('/channels/' + roomId);
			}
			else {
				showError = true;
			}
		});
	}
</script>

<dialog open>
	<article>
	  <h3>Enter password :</h3>
		<input type="text" bind:value={password}>
		{#if showError}
		<span>Error ! Wrong password.</span>
		{/if}
	  <footer>
		<a href="/channels" role="button" class="secondary">Cancel</a>
		<a href=" " role="button" on:click={sendPassword}>Confirm</a>
	  </footer>
	</article>
  </dialog>