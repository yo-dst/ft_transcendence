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

	var countFakeFriend = 0;
	function addFakeFriend() {
		const fakeFriend = {
			username: `fake${countFakeFriend}`,
			avatar: {
				url: "https://picsum.photos/200"
			}
		}
		friendsData.friends = [...friendsData.friends, fakeFriend];
		countFakeFriend++;
	}

	var countFakeFriendRequest = 0;
	function addFakeFriendRequest() {
		const fakeFriendRequest = {
			creator: {
				username: `fake${countFakeFriendRequest}`,
				avatar: {
					url: "https://picsum.photos/200"
				}
			}
		}
		friendRequestsData.friendRequests = [...friendRequestsData.friendRequests, fakeFriendRequest];
		countFakeFriendRequest++;
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
</section>

<section>
	<div class="list-container bg-light-dark">
		<h3>Friends</h3>
		<div class="center-container">
		{#if friendsData.loading}
			<Loading/>
		{:else if friendsData.error}
			<pre>{JSON.stringify(friendsData.error, undefined, 2)}</pre>
		{:else if friendsData.friends}
			<ul>
			{#each friendsData.friends as friend}
				<li class="li-friend">
					<div>
						<img src={friend.avatar.url} alt="friend"/>
						<span>{friend.username}</span>
					</div>
					<div>
						<button on:click={() => removeFriend(friend.username)} style="background-color: var(--del-color);">
							<iconify-icon icon="charm:cross" style="font-size: 1.7rem;"/>
						</button>
					</div>
				</li>
			{/each}
			</ul>
		{/if}
		</div>
	</div>
</section>

<section>
	<div class="list-container bg-light-dark">
		<h3>Friend requests received</h3>
		<div class="center-container">
			{#if friendRequestsData.loading}
				<Loading/>
			{:else if friendRequestsData.error}
				<pre>{JSON.stringify(friendRequestsData.error, undefined, 2)}</pre>
			{:else if friendRequestsData.friendRequests}
				<ul>
				{#each friendRequestsData.friendRequests as friendRequest}
					<li>
						<div>
							<img src={friendRequest.creator.avatar.url} alt="friend-request-creator"/>
							<span>{friendRequest.creator.username}</span>
							<!-- <pre>{JSON.stringify(friendRequest, undefined, 2)}</pre> -->
						</div>
						<div>
							<button on:click={() => acceptFriendRequest(friendRequest)}>accept</button>
							<button on:click={() => declineFriendRequest(friendRequest)}>decline</button>
						</div>
					</li>
				{/each}
				</ul>
			{/if}
		</div>
	</div>
</section>

<section>
	<button on:click={addFakeFriend}>Add fake friend</button>
	<button on:click={addFakeFriendRequest} style="margin-bottom: 2rem;">Add fake friend request</button>
</section>

<style>
	h3 {
		margin-bottom: 1rem;
		font-weight: normal;
		margin-left: 0.5rem;
	}

	ul {
		padding: 0;
		margin: 0;
		width: 100%;
	}

	ul > li {
		background-color: #0d1117;
		list-style-type: none;
		padding: 0.5rem 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-radius: 5px;
		margin-bottom: 0.7rem;
	}

	ul > li > :first-child {
		display: flex;
		align-items: center;
	}

	ul > li > :last-child {
		display: flex;
		gap: 0.5rem;
	}


	ul > li img {
		height: 3.5rem;
		width: auto;
		object-fit: cover;
		aspect-ratio: 1/1;
		border-radius: 50%;
		margin-right: 0.7rem;
	}

	ul > li button {
		width: auto;
		height: auto;
		margin-bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		border: none;
	}

	.li-friend button {
		display: none;
	}

	.li-friend:hover {
		background-color: #33383E;
		cursor: pointer;
	}

	.li-friend:hover button {
		display: flex;
	}

	.li-friend button:hover {
		opacity: 0.9;
	}
</style>
