<script lang="ts">
	import { user } from "$lib/stores/user";
    import { afterUpdate } from "svelte";
    import { page } from "$app/stores";
    import ModalChannelSettings from "$lib/components/ModalChannelSettings.svelte";
    import { chatSocket } from "$lib/stores/chat-socket";
    import Loading from "$lib/components/Loading.svelte";
    import ModalPasswordChannels from "$lib/components/ModalPasswordChannels.svelte";
    import { goto } from "$app/navigation";
    import ChatModal from "$lib/components/ChatModal.svelte";

	let messages: string[] = [];
	let input: string = "";
	let usernames: string[] = [];
	let element: any;
	const channelId: string | undefined = $page.url.href.split('/').pop();
	let roomName: string;
	let showSettingsModal:boolean = false;
	let isPublic: boolean;
	let isLoading: boolean = true;
	let showPasswordModal: boolean = true;
	
	$chatSocket.emit('verifyUser', channelId, (isConnected: boolean) => {
		if (isConnected) showPasswordModal = false;
		else showPasswordModal = true;
		isLoading = false;
	})
	let show = false;
	const setShow = (value: boolean) => show = value;
	let usernameForModal: string;

	$chatSocket.emit('getInfo', channelId, (info: any) => {
		roomName = info.roomName;
		isPublic = info.isPublic;
	});


	// triggers after component has been updated
	afterUpdate(() => {
		if(messages && element) scrollToBottom(element);
	})

	const scrollToBottom = async (node: any) => {
    	node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	}; 

	function sendMessage() {
		if (input){
			$chatSocket.emit('newMessage', channelId, input);
			input = "";
		}
	}

	$chatSocket.on('newMessage', (Username: string, newMessage: string) => {
		if (!$user.blocked.find((user) => (user.username === Username)) || $user.blocked.length === 0) {
			usernames = [...usernames, Username];
			messages = [...messages, newMessage];
		}
	})

</script>
{#if isLoading}
	<Loading/>
{:else if showPasswordModal}
<ModalPasswordChannels closeModal={() => {}} roomId={channelId}/>
{:else}
<article>
	<header>
		<div>
			<iconify-icon style="margin-left: 0.6rem;font-size: 2rem;" on:click={() => {showSettingsModal = true}} on:keypress icon="material-symbols:settings-outline"/>
				<h1 style="margin:0">Channel {roomName}</h1>
		</div>
	</header>

	<body bind:this={element} style="overflow: auto;">
		<ul>
			<li>
				<span style="color: #9F2B68">System</span> : Welcome to the channel {$user.profile?.username} !
			</li>
			{#each messages as message, index}
				<li>
					{#if usernames[index] !== $user.profile?.username}
						<span style="color: #FEA347;"
							on:click|stopPropagation={() => { usernameForModal = usernames[index]; setShow(true); }}
							on:keypress
						>
							{usernames[index]}
						</span>
					{:else}
						<span style="color: #FEA347; text-decoration: underline;">
							{usernames[index]}
						</span>
					{/if}
					: {message}
				</li>
			{/each}
		</ul>
	</body>
		<footer style="margin-top:auto">
			<div>
				<input bind:value={input} on:keypress={(e) => {if (e.key === "Enter") sendMessage()}} type="text" style="margin: 0;margin-right: 1rem;text-indent: 2rem;">
				<iconify-icon on:click={sendMessage} on:keypress icon="ic:baseline-send" style="font-size: 1.5rem;"></iconify-icon>
			</div>
		</footer>
</article>
{/if}

{#if showSettingsModal}
	<ModalChannelSettings closeModal={() => {showSettingsModal = false}} {channelId}/>
{/if}

{#if show}
	<ChatModal {setShow} username={usernameForModal} />
{/if}

<style>
	header {
		padding: 1rem 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	header div {
		display: flex;
		align-items: center; /* align items in the center vertically */
		justify-content: center; /* distribute items evenly */
		width: 100%; /* take up the full width */
	}

	header iconify-icon {
		font-size: 2rem;
		margin-right: 2.3rem;
	}

	article {
		height: 80vh;
		display: flex;
		flex-direction: column;
		margin: auto;
	}

	footer div {
		display: flex;
		align-items: center;
	}

	footer iconify-icon {
		position: absolute;
		padding-left: 1rem;
	}

	ul li {
		list-style: none;
	}

</style>