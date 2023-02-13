<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let friends = data.friends;
</script>

<section>
	<div class="friend-title">Friends</div>
	<ul>
		{#each friends as friend}
			<li>
				<img src="https://picsum.photos/200" alt="friend" class="friend-img"/>
				{friend.username}
			</li>
		{/each}
	</ul>
</section>

<style>
	ul {
		/* background-color: #202020; */
		padding: 0;
	}

	ul li {
		border-bottom: 0.05rem solid aliceblue;
		list-style-type: none;
		padding: 0.5rem 1rem;
	}

	.friend-img {
		height: 3rem;
		width: auto;
		border-radius: 50%;
		margin-right: 0.5rem;
	}

	.friend-title {
		padding-left: 0.5rem;
		margin-bottom: 0.5rem;
		font-size: 1.5rem;
		color: var(--h3-color);
	}
</style>