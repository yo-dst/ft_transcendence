<script lang="ts">
    import { goto } from "$app/navigation";
	import { user } from "$lib/stores/user";
    import type { FriendRequest } from "$lib/types/friend-request";
    import { onMount } from "svelte";
	import { eventsSocket } from "$lib/stores/events-socket";
    import type { Friend } from "$lib/types/friend";
    import { acceptFriendRequest, declineFriendRequest, fetchFriendRequests, fetchFriendsProfile, fetchProfile, removeFriend, sendFriendRequest } from "$lib/api";
    import { notifications } from "$lib/stores/notifications";
    import type { Profile } from "$lib/types/profile";
	
	let friendsProfile: Profile[] = [];
	let friends: Friend[] = [];
	let friendRequests: FriendRequest[] = [];

	let sendRequestValue: string;
	let sendRequestError: any;

	var countFakeFriend = 0;
	function addFakeFriend() {
		const fakeFriend = {
			isLoggedIn: countFakeFriend % 2 === 0,
			isInGame: false,
			profile: {
				username: `fake${countFakeFriend}`,
				avatar: {
					url: "https://picsum.photos/200"
				},
				wins: countFakeFriend,
				losses: countFakeFriend
			}
		}
		friends = [...friends, fakeFriend];
		countFakeFriend++;
	}

	var countFakeFriendRequest = 0;
	function addFakeFriendRequest() {
		const fakeFriendRequest = {
			id: countFakeFriend,
			creator: {
				username: `fake${countFakeFriendRequest}`,
				avatar: {
					url: "https://picsum.photos/200"
				},
				wins: countFakeFriend,
				losses: countFakeFriend
			}
		}
		friendRequests = [...friendRequests, fakeFriendRequest];
		countFakeFriendRequest++;
	}

	async function isUserConnected(username: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			$eventsSocket.emit("is-user-connected", username, (isLoggedIn: boolean) => {
				resolve(isLoggedIn);
			});
		});
	}

	async function getFriendsStatus(friendsProfile: Profile[]) {
		friends = await Promise.all(friendsProfile.map(async profile => {
			const isConnected = await isUserConnected(profile.username);
			return {
				isLoggedIn: isConnected,
				isInGame: false,
				profile
			};
		}));
	}

	async function sendRequest() {
		const friendRequest = await sendFriendRequest(sendRequestValue);
		$eventsSocket.emit("send-friend-request", {
			id: friendRequest.id,
			receiverUsername: sendRequestValue
		});
	}
	
	// remove notif
	async function acceptRequest(id: number) {
		const newFriendProfile = await acceptFriendRequest(id);
		friendsProfile = [...friendsProfile, newFriendProfile];
		friendRequests = friendRequests.filter(request => request.id !== id);
		$notifications = $notifications.filter(notification => (notification.type !== "friend-request" && notification.data.id === id))
		$eventsSocket.emit("accept-friend-request", newFriendProfile.username);
	}

	async function declineRequest(id: number) {
		await declineFriendRequest(id);
		friendRequests = friendRequests.filter(request => request.id !== id);
		$notifications = $notifications.filter(notification => (notification.type !== "friend-request" && notification.data.id === id))
	}

	async function remove(username: string) {
		await removeFriend(username);
		friendsProfile = friendsProfile.filter(profile => profile.username !== username);
		$eventsSocket.emit("remove-friend", username);
	}

	$: getFriendsStatus(friendsProfile);

	onMount(async () => {
		if (!$user.isLoggedIn) {
			goto("/login");
		} else {
			friendsProfile = await fetchFriendsProfile();
			friendRequests = await fetchFriendRequests();

			$eventsSocket.on("user-connected", (username: string) => {
				friends = friends.map(friend => {
					if (friend.profile.username === username) {
						friend.isLoggedIn = true;
					}
					return friend;
				});
			});

			$eventsSocket.on("user-disconnected", (username: string) => {
				friends = friends.map(friend => {
					if (friend.profile.username === username) {
						friend.isLoggedIn = false;
					}
					return friend;
				});
			});

			$eventsSocket.on("friend-request-accepted", async (username: string) => {
				const newFriendProfile = await fetchProfile(username);
				friendsProfile = [...friendsProfile, newFriendProfile];
			});

			$eventsSocket.on("friend-removed", (username: string) => {
				friendsProfile = friendsProfile.filter(profile => profile.username !== username);
			});

			$eventsSocket.on("receive-friend-request", async (friendRequest: any) => {
				const creatorProfile = await fetchProfile(friendRequest.creatorUsername);
				friendRequests = [...friendRequests, { id: friendRequest.id, creator: creatorProfile }]; 
			});
		}
	});
</script>

<section>
	<h3>Add a friend</h3>
	<div class="input-button-container">
		<input type="text" placeholder="Username" bind:value={sendRequestValue} />
		<button on:click={sendRequest} style="background-color: var(--ins-color); border:none;">
			<iconify-icon icon="fluent-mdl2:add-friend" style="font-size: 1.5rem"/>
		</button>
	</div>
{#if sendRequestError}
	<pre>{JSON.stringify(sendRequestError, undefined, 2)}</pre>
{/if}
</section>

<section>
	<div class="list-container bg-light-dark">
		<h3>Friends</h3>
		<ul>
		{#each friends as friend}
			<li class="li-friend">
				<div class="friend-profile">
					<div class:online={friend.isLoggedIn}></div>
					<img src={friend.profile.avatar.url} alt="friend"/>
					<span>{friend.profile.username}</span>
				</div>
				<div>
					<button on:click={() => remove(friend.profile.username)} style="background-color: var(--del-color);">
						<iconify-icon icon="charm:cross" style="font-size: 1.7rem;"/>
					</button>
				</div>
			</li>
		{/each}
		</ul>
	</div>
</section>

<section>
	<div class="list-container bg-light-dark">
		<h3>Friend requests received</h3>
		<ul>
		{#each friendRequests as friendRequest}
			<li>
				<div>
					<img src={friendRequest.creator.avatar.url} alt="friend-request-creator"/>
					<span>{friendRequest.creator.username}</span>
				</div>
				<div>
					<button on:click={() => acceptRequest(friendRequest.id)}>accept</button>
					<button on:click={() => declineRequest(friendRequest.id)}>decline</button>
				</div>
			</li>
		{/each}
		</ul>
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

	.li-friend .friend-profile {
		position: relative;
	}

	.online {
		position: absolute;
		top: 0;
		left: 0;
		background-color: greenyellow;
		width: 16px;
		height: 16px;
		border-radius: 50%;
	}
</style>
