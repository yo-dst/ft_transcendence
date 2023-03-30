<script lang="ts">
    import { goto } from "$app/navigation";
    import Loading from "$lib/components/Loading.svelte";
	import { user } from "$lib/stores/user";
    import type { Error } from "$lib/types/error";
    import type { FriendRequest } from "$lib/types/friend-request";
    import type { Profile } from "$lib/types/profile";
    import { onMount } from "svelte";

	let friendsData: {
		friends?: Profile[],
		error?: Error,
		loading: boolean
	} = {
		loading: false
	};

	let friendRequestsData: {
		friendRequests?: FriendRequest[],
		error?: Error,
		loading: boolean
	} = {
		loading: false
	};

	let addFriendData: {
		username: string,
		error?: Error
	} = {
		username: ""
	}

	async function fetchFriends() {
		friendsData.loading = true;
		const res = await fetch("http://localhost:3000/user/friends", { credentials: "include" });
		const data = await res.json();
		if (res.ok) {
			friendsData.friends = data;
		} else {
			friendsData.error = data;
		}
		friendsData.loading = false;
	}

	async function fetchFriendRequests() {
		friendRequestsData.loading = true;
		const res = await fetch("http://localhost:3000/user/friend-requests", { credentials: "include" });
		const data = await res.json();
		if (res.ok) {
			friendRequestsData.friendRequests = data;
		} else {
			friendRequestsData.error = data;
		}
		friendRequestsData.loading = false;
	}

	async function sendFriendRequest() {
		const res = await fetch("http://localhost:3000/friend-requests", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username: addFriendData.username })
		});
		const data = await res.json();
		if (res.ok) {
			addFriendData.error = undefined;
		} else {
			addFriendData.error = data;
		}
	}
	
	async function acceptFriendRequest(friendRequest: any) {
		const res = await fetch(`http://localhost:3000/friend-requests/accept/${friendRequest.id}`, {
			method: "POST",
			credentials: "include"
		});
		const data = await res.json();
		if (res.ok) {
			friendRequestsData.friendRequests = friendRequestsData.friendRequests.filter(request  => request.id !== friendRequest.id);
			friendsData.friends = [...friendsData.friends, data];
		} else {
			console.log(data);
		}
	}

	async function declineFriendRequest(friendRequest: any) {
		const res = await fetch(`http://localhost:3000/friend-requests/decline/${friendRequest.id}`, {
			method: "POST",
			credentials: "include"
		});
		const data = await res.json();
		if (res.ok) {
			friendRequestsData.friendRequests = friendRequestsData.friendRequests.filter(request => request.id !== friendRequest.id);
		} else {
			console.log(data);
		}
	}

	async function removeFriend(username: string) {
		const res = await fetch("http://localhost:3000/user/remove-friend", {
			method: "PATCH",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username })
		});
		if (res.ok) {
			friendsData.friends = friendsData.friends.filter(friend => friend.username !== username);
		} else {
			console.log(await res.json());
		}
	}

	onMount(async () => {
		if (!$user.isLoggedIn) {
			goto("/login");
		} else {
			fetchFriends();
			fetchFriendRequests();
		}
	});
</script>

<section>
	<h3>Add a friend</h3>
	<div class="input-button-container">
		<input type="text" placeholder="Username" bind:value={addFriendData.username} />
		<button on:click={sendFriendRequest} style="background-color: var(--ins-color); border:none;">
			<iconify-icon icon="fluent-mdl2:add-friend" style="font-size: 1.5rem"/>
		</button>
	</div>
	{#if addFriendData.error}
		<pre>{JSON.stringify(addFriendData.error, undefined, 2)}</pre>
	{/if}

	<div class="list-container">
		<h3>Friends</h3>
	</div>
</section>

<section>
	<div class="title">Add a friend</div>
	<div class="add-friend">
		<input type="text" placeholder="Username" bind:value={addFriendData.username} />
		<button 
			style="background-color: var(--ins-color); border:none;"
			on:click={sendFriendRequest}
		>
			<iconify-icon icon="fluent-mdl2:add-friend" style="font-size: 1.5rem"
			/>
		</button>
	</div>
	{#if addFriendData.error}
		<pre>{JSON.stringify(addFriendData.error, undefined, 2)}</pre>
	{/if}

	<div class="friends-title">Friends</div>
	{#if friendsData.loading}
		<Loading/>
	{:else if friendsData.error}
		<pre>{JSON.stringify(friendsData.error, undefined, 2)}</pre>
	{:else if friendsData.friends}
		<ul>
		{#each friendsData.friends as friend}
			<li>
				<div class="friend-right">
					<img
						src={friend.avatar.url}
						alt="friend"
						class="friend-img"
					/>
					<span>{friend.username}</span>
				</div>
				<div class="friend-left">
					<button on:click={() => removeFriend(friend.username)}>Remove</button>
				</div>
			</li>
		{/each}
		</ul>
	{/if}
	
	<div class="friends-title">Friend requests received</div>
	{#if friendRequestsData.loading}
		<Loading/>
	{:else if friendRequestsData.error}
		<pre>{JSON.stringify(friendRequestsData.error, undefined, 2)}</pre>
	{:else if friendRequestsData.friendRequests}
		<ul>
		{#each friendRequestsData.friendRequests as friendRequest}
			<li>
				<pre>{JSON.stringify(friendRequest, undefined, 2)}</pre>
				<button on:click={() => acceptFriendRequest(friendRequest)}>accept</button>
				<button on:click={() => declineFriendRequest(friendRequest)}>decline</button>
			</li>
		{/each}
		</ul>
	{/if}

</section>

<!-- was in friend <li>
<div class="friend-left">
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

<style>
	img {
		height: 3rem;
		width: auto;
		object-fit: cover;
		aspect-ratio: 1/1;
		border-radius: 50%;
		margin-right: 0.5rem;
	}

	h3 {
		margin-bottom: 1rem;
		font-weight: normal;
	}

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
