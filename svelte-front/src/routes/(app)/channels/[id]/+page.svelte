<script lang="ts">
	import { user } from "$lib/stores/user";
    import { afterUpdate, getContext, onMount } from "svelte";
    import { page } from "$app/stores";
    import ModalChannelSettings from "$lib/components/ModalChannelSettings.svelte";
    import { chatSocket } from "$lib/stores/chat-socket";
    import Loading from "$lib/components/Loading.svelte";
    import ModalPasswordChannels from "$lib/components/ModalPasswordChannels.svelte";
    import { goto } from "$app/navigation";
    import ChatModal from "$lib/components/ChatModal.svelte";
    import type { connectedUser } from "$lib/types/connected-user";
    import { chatMessages } from "$lib/stores/chat-messages";

	let input: string = "";
	let element: any;
	const channelId: string = $page.url.href.split('/').pop() as string;
	let roomName: string;
	let showSettingsModal:boolean = false;
	let isLoading: boolean = true;
	let showPasswordModal: boolean = true;
	let userIsAdmin: boolean;
	let showUserList = false;
	let connectedUser: connectedUser;

	if (!$chatMessages[channelId]) $chatMessages[channelId] = [];

	$chatSocket.emit('verifyUser', channelId, (info: any) => {
		if (info.isConnected) showPasswordModal = false;
		else showPasswordModal = true;
		roomName = info.roomName;
		userIsAdmin = info.isAdmin;
		isLoading = false;
		connectedUser = info.connectedUser;
	})
	let show = false;
	const setShow = (value: boolean) => show = value;
	let usernameForModal: string;

	// triggers after component has been updated
	afterUpdate(() => {
		if (showUserList) {
			return;
		}
		if($chatMessages[channelId] && element) scrollToBottom(element);
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

	// $chatSocket.on('newMessage', () => {
	// 	$chatMessages = $chatMessages;
	// })

	$chatSocket.on('updateConnectedUsers', (info: any) => {
		connectedUser = info;
		connectedUser = connectedUser;
	})

	function leaveRoom() {
		$chatSocket.emit('leaveRoom', channelId, $user.id);
		goto("/channels");
	}

	onMount(() => {
		if (!$user.isLoggedIn) {
			goto("/login");
		} else {
			// users = fetchUsersInRoom();
		}
	})
</script>
{#if isLoading}
	<Loading/>
{:else if showPasswordModal}
<ModalPasswordChannels roomId={channelId}/>
{:else}
<article>
	<header>
		<div>
			{#if connectedUser.owner === $user.profile?.username}
				<iconify-icon icon="material-symbols:settings-outline"
					style="font-size: 1.8rem"
					on:click={() => {showSettingsModal = true}}
					on:keypress
				></iconify-icon>
			{/if}
			<h3 class="safe-words">Channel {roomName}</h3>
		</div>
		<div>
			{#if !showUserList}
				<iconify-icon icon="mdi:users-group"
					style="font-size: 2rem"
					on:click={() => showUserList = true}
					on:keypress
				></iconify-icon>
			{:else}
				<iconify-icon icon="jam:messages-f"
					style="font-size: 1.8rem; margin-top: 0.15rem;"
					on:click={() => showUserList = false}
					on:keypress
				></iconify-icon>
			{/if}
			<iconify-icon icon="pepicons-pop:leave"
				style="font-size: 1.8rem"
				on:click={leaveRoom}
				on:keypress
			></iconify-icon>
		</div>
	</header>

	<!-- add icon for admin(s) and owner -->
	{#if showUserList}
		<body style="overflow: auto;">
			<ul>
				<!-- sort them -> owner > admin > random -->
				{connectedUser.owner}
				{#each connectedUser.admin as username}
					<li>
						<span>{username}</span>
					</li>
				{/each}
				{#each connectedUser.member as username}
					<li>
						<span>{username}</span>
					</li>
				{/each}
			</ul>
		</body>
	{:else}
		<body bind:this={element} style="overflow: auto;">
			<ul>
				<li>
					<span style="color: #9F2B68">System</span> : Welcome to the channel {$user.profile?.username} !
				</li>
				{#each $chatMessages[channelId] as userInfo}
					<li>
						<!-- {#if usernames[index] !== $user.profile?.username} -->
							{#if userInfo.username !== $user.profile?.username}
							<span style="color: #FEA347;"
								on:click|stopPropagation={() => { usernameForModal = userInfo.username; setShow(true); }}
								on:keypress
							>
								{userInfo.username}
								<!-- {usernames[index]} -->
							</span>
						{:else}
							<span style="color: #FEA347; text-decoration: underline;">
								<!-- {usernames[index]} -->
								{userInfo.username}
							</span>
						{/if}
						: {userInfo.message}
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
	{/if}
</article>
{/if}

{#if showSettingsModal}
	<ModalChannelSettings closeModal={() => {showSettingsModal = false}} {channelId}/>
{/if}

{#if show}
	<ChatModal {setShow} username={usernameForModal} admins={connectedUser.admin} {channelId} owner={connectedUser.owner}/>
{/if}

<style>
	header {
		padding: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 3rem;
	}

	header h3 {
		margin-bottom: 0;
	}

	header > :first-child {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	header > :last-child {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
	}

	header iconify-icon:hover {
		cursor: pointer;
		transform: scale(1.05);
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