<script lang="ts">
    import { goto } from "$app/navigation";
    import ModalChannels from "$lib/components/ModalChannels.svelte";
    import { user } from "$lib/stores/user";
    import type { chatRoom } from "$lib/types/chat-rooms";
    import { io } from "socket.io-client";
    import { onMount } from "svelte";
	import { chatSocket } from "$lib/stores/chat-socket";
	
	let rooms: chatRoom[] = [];
	let isModalShowing = false;

	
	function joinRoom(id: string) {
		$chatSocket.emit('joinRoom', id, undefined, (found: boolean) => {
			if (found) goto('/channels/' + id);
		})
	}

	function closeModal() {
		isModalShowing = false;
	}

	onMount(() => {
		if (!$user.isLoggedIn) {
			goto("/login");
		}
		else {
			$chatSocket = io("localhost:3000/chat", {auth: {username: $user.profile?.username}});
			
			$chatSocket.emit('getRooms', (Rooms: chatRoom[]) => {
				rooms = Rooms;
			})
		}

	});
</script>

<section>
	<a href="/channels/create" role="button" style="width: 100%;">Create your channel</a>
	<div class="title">Channels</div>
	<ul>
		{#each rooms as room}
			<li>
				<div class="channel-left">
					<div class="users">
						<span>{room.member.length} / {room.capacity}</span>
						<iconify-icon icon="fa-solid:user-friends"></iconify-icon>	
					</div>
					<div class="channel-name">
						{room.name}
						<small><i>{room.ownerName}</i></small>
					</div>
				</div>
				<div class="channel-right">
					{#if room.isProtected}
						<iconify-icon icon="material-symbols:lock" style="font-size: 1.5rem;"></iconify-icon>
						<button class="secondary" on:click={() => {isModalShowing = true}}>
							<iconify-icon icon="material-symbols:open-in-browser"></iconify-icon>
						</button>
					{:else}
						<button class="secondary" on:click={() => {joinRoom(room.id)}}>
							<iconify-icon icon="material-symbols:open-in-browser"></iconify-icon>
						</button>
						{/if}
					</div>
				</li>
				{#if isModalShowing}
					<ModalChannels closeModal={closeModal} roomId={room.id}/>
				{/if}
		{/each}
	</ul>
</section>

<style>
	.title {
		margin-top: 1.5rem;
		padding-left: 0.5rem;
		font-size: 1.5rem;
		color: var(--h3-color);
		background-color: #090D10;
		padding-top: 0.2rem;
		border-radius: 5px 5px 0 0;
	}

	ul {
		padding: 0;
		background-color: #090D10;
		padding: 0.5rem 1rem 0.5rem 0.5rem;
		border-radius: 0 0 5px 5px;
	}

	ul > li {
		background-color: var(--background-color);
		list-style-type: none;
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	ul > li button {
		width: auto;
		height: auto;
		padding: 0.3rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 0;
	}

	iconify-icon {
		font-size: 1.3rem;
	}

	.channel-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.channel-left {
		display: flex;
		align-items: center;
	}

	.users {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 5.5rem;
	}

	.channel-name {
		margin-left: 1.5rem;
		display: flex;
		flex-direction: column;
	}
</style>