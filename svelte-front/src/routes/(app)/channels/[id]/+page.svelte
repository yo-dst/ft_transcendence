<script lang="ts">
	import { user } from "$lib/stores/user";
    import { afterUpdate, getContext } from "svelte";
    import type { Socket } from "socket.io-client";
    import SocketContext from "../SocketContext.svelte";
    import { page } from "$app/stores";
    import ModalChannelSettings from "$lib/components/ModalChannelSettings.svelte";

	let messages: string[] = [];
	let input: string = "";
	let usernames: string[] = [];
	let element: any;
	const socket: Socket = getContext(SocketContext);
	const channelId = $page.url.href.split('/').pop();
	let roomName: string;
	let showSettingsModal:boolean = false;

	socket.emit('getRoomName', channelId, (RoomName: string) => {
		roomName = RoomName;
		console.log(roomName);
	});

	// triggers after component has been updated
	afterUpdate(() => {
		if(messages) scrollToBottom(element);
	})

	const scrollToBottom = async (node: any) => {
    	node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	}; 

	function sendMessage() {
		if (input){
			socket.emit('newMessage', channelId, input);
			input = "";
		}
	}

	socket.on('newMessage', (Username, newMessage) => {
		usernames = [...usernames, Username];
		messages = [...messages, newMessage];
	})

</script>

<article>
	<header>
		<iconify-icon on:click={() => {showSettingsModal = true}} on:keypress icon="material-symbols:settings-outline" style="font-size: 2rem;"/>
		<h1>Channel {roomName}</h1>
	</header>

	<body bind:this={element} style="overflow: auto;">
		<ul>
			<li>
				<span style="color: #9F2B68">System</span> : Welcome to the channel {$user.profile?.username} !
			</li>
			{#each messages as message, index}
				<li>
					<span style="color: #FEA347">{usernames[index]}</span> : {message}
				</li>
			{/each}
		</ul>
	</body>
		<footer>
			<div>
				<input bind:value={input} on:keypress={(e) => {if (e.key === "Enter") sendMessage()}} type="text" style="margin: 0;margin-right: 1rem;text-indent: 2rem;">
				<iconify-icon on:click={sendMessage} on:keypress icon="ic:baseline-send" style="font-size: 1.5rem;"></iconify-icon>
			</div>
		</footer>
</article>

{#if showSettingsModal}
	<ModalChannelSettings />
{/if}

<style>
	header {
		padding: 1rem 0;
	}

	header h1 {
		text-align: center;
		margin: 0;
	}

	footer {
		margin-top: auto;
	}

	article {
		height: 80vh;
		display: flex;
		flex-direction: column;
		margin: auto;
	}

	div {
		display: flex;
		align-items: center;
	}

	iconify-icon {
		position: absolute;
		padding-left: 1rem;
	}

</style>