<script lang="ts">
    import type { Socket } from "socket.io-client";
    import { getContext } from "svelte";
    import SocketContext from "../../routes/(app)/channels/SocketContext.svelte";

	export let closeModal: () => void;
	export let isPublic: boolean;
	export let channelId: string | undefined;
	let password: string = "";
	let isPrivate: boolean = !isPublic;
	const socket: Socket = getContext(SocketContext);

	function sendChange() {
		socket.emit('roomUpdate', channelId, isPrivate, password);
		closeModal();
	}
</script>

<dialog open>
	<article>
	  <h3>Channel settings</h3>
	  <span>Change password : </span>
	  <input type="text" bind:value={password}>
	  <small>Change the password of the room, leave empty for none</small>

	  <fieldset>
		  <label for="switch">
			  <input type="checkbox" id="switch" name="switch" role="switch" bind:checked={isPrivate}>
			  Private
			  <small style="padding-top: 0.5rem;margin:0;">Private rooms will not appear in the listing</small>
			</label>
	  </fieldset>
		
	  <footer>
		<a href=" " role="button" id="leave">Leave Room</a>
		<a href=" " role="button" class="secondary" id="move" on:click={closeModal}>Cancel</a>
		<a href=" " role="button" id="move" on:click={sendChange}>Confirm</a>
	  </footer>
	</article>
  </dialog>

<style>
	footer {
		display: flex;
	}

	#leave {
		margin-right: auto;
	}

	#move {
		margin: 0 0 0 0.4rem;
	}
</style>