<script lang="ts">
	import type { PageData } from "./$types";
	// import { user } from "/stores/user";

	export let data: PageData;

	let friends = data.friends;

	let username: string;

	// function addFriend() {

	// }
</script>

<section>
	<div class="title">Add a friend</div>
	<div class="add-friend">
		<input type="text" placeholder="Username" />
		<button style="background-color: var(--ins-color); border:none;"
			><iconify-icon
				icon="fluent-mdl2:add-friend"
				style="font-size: 1.5rem"
			/></button
		>
	</div>
	<div class="friends-title">Friends</div>
	<ul>
		{#each friends as friend}
			<li>
				<div class="friend-right">
					<img
						frien
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
