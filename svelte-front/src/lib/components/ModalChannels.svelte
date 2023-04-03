<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Socket } from "socket.io-client";


	export let socket: Socket;
	export let closeModal: () => void;
	export let roomId: string;
	let password: string;
	let showError: boolean = false;

	function sendPassword() {
		socket.emit('joinRoom', roomId, password, (accepted: boolean) => {
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
		<a href="#cancel" on:click={closeModal} role="button" class="secondary">Cancel</a>
		<a href="#confirm" role="button" on:click={sendPassword}>Confirm</a>
	  </footer>
	</article>
  </dialog>