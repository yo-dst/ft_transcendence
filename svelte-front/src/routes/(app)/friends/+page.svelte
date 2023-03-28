<script lang="ts">
    import { goto } from "$app/navigation";
	import { user } from "$lib/stores/user";
    import type { UserType } from "$lib/types/user";
    import { onMount } from "svelte";

	let username: string;
	let friendRequestError: any;
	let friends: UserType[] = [];
	let friendRequests: any[] = [];

	async function sendFriendRequest() {
		const res = await fetch("http://localhost:3000/friend-request", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username })
		});
		if (res.ok) {
			friendRequestError = null;
		} else {
			friendRequestError = await res.json();
		}
	}
	
	async function acceptFriendRequest(friendRequest: any) {
		const res = await fetch(`http://localhost:3000/friend-request/accept/${friendRequest.id}`, { credentials: "include" });
		const data = await res.json();
		if (res.ok) {
			friendRequests = friendRequests.filter(request  => request.id !== friendRequest.id);
		} else {
			console.log(data);
		}
	}

	async function declineFriendRequest(friendRequest: any) {
		const res = await fetch(`http://localhost:3000/friend-request/decline/${friendRequest.id}`, { credentials: "include" });
		const data = await res.json();
		if (res.ok) {
			friendRequests = friendRequests.filter(request  => request.id !== friendRequest.id);
		} else {
			console.log(data);
		}
	}

	onMount(async () => {
		if (!$user) {
			goto("/login");
		}
	});
</script>

<section>
	<div class="title">Add a friend</div>
	<div class="add-friend">
		<input type="text" placeholder="Username" bind:value={username} />
		<button 
			style="background-color: var(--ins-color); border:none;"
			on:click={sendFriendRequest}
		>
			<iconify-icon
				icon="fluent-mdl2:add-friend"
				style="font-size: 1.5rem"
			/>
		</button>
	</div>
	{#if friendRequestError}
		<pre>{JSON.stringify(friendRequestError, undefined, 2)}</pre>
	{/if}
	<div class="friends-title">Friends</div>
	<ul>
		{#each friends as friend}
			<li>
				<div class="friend-right">
					<img
						src={friend.avatar.url}
						alt="friend"
						class="friend-img"
					/>
					<span>{friend.username}</span>
				</div>
				<!-- <div class="friend-left">
					{#if friend.inGame}
						<button class="spec-button"
							><iconify-icon
								icon="ic:baseline-remove-red-eye"
							/></button
						>
					{/if}
					{#if friend.inChannel}
						<button class="secondary"
							><iconify-icon
								icon="material-symbols:open-in-browser"
							/></button
						>
					{/if}
					{#if friend.online}
						<button class="invite-button"
							><iconify-icon
								icon="material-symbols:auto-read-play-outline-sharp"
							/></button
						>
					{/if}
					<button class="del-button"
						><iconify-icon icon="charm:cross" /></button
					>
				</div> -->
			</li>
		{/each}
	</ul>
	<div class="friends-title">Friend requests received</div>
	<ul>
		{#each friendRequests as friendRequest}
			<pre>{JSON.stringify(friendRequest, undefined, 2)}</pre>
			<button on:click={() => acceptFriendRequest(friendRequest)}>accept</button>
			<button on:click={() => declineFriendRequest(friendRequest)}>decline</button>
		{/each}
	</ul>
</section>

<style>
	ul {
		background-color: #090d10;
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

	ul > :last-child {
		margin-bottom: 0.5rem;
	}

	ul > li button {
		width: auto;
		height: auto;
		margin-bottom: 0;
		display: flex;
		align-items: center;
		padding: 0.5rem;
	}

	.friend-img {
		height: 3rem;
		width: auto;
		border-radius: 50%;
		margin-right: 0.5rem;
	}

	.title {
		padding-left: 0.5rem;
		font-size: 1.5rem;
		color: var(--h3-color);
		margin-bottom: 0.5rem;
	}

	.friends-title {
		padding-left: 0.5rem;
		font-size: 1.5rem;
		color: var(--h3-color);
		padding-top: 0.2rem;
		border-radius: 5px 5px 0 0;
		background-color: #090d10;
	}

	.add-friend {
		display: flex;
		gap: 1rem;
		max-width: 450px;
		margin-bottom: 1.5rem;
	}

	.add-friend input {
		width: 80%;
		height: 3rem;
	}

	.add-friend button {
		width: auto;
		height: 3rem;
	}

	.friend-left {
		display: flex;
		gap: 0.5rem;
	}

	.invite-button {
		background-color: var(--ins-color);
		border: none;
	}

	.del-button {
		background-color: var(--del-color);
	}

	.spec-button {
		background-color: hsl(195deg, 85%, 41%);
		border: none;
	}

	.friend-right {
		display: flex;
		align-items: center;
	}
</style>
