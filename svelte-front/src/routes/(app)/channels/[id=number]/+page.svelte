<script lang="ts">
	import type { PageData } from "./$types";
	import { user } from "$lib/stores/user";
    import { afterUpdate } from "svelte";
    import { io } from "socket.io-client";

	export let data: PageData;
	let list: string[] = [];
	let userInput: string;
	let element: any;

	const socket = io("localhost:3000/chat");

	// triggers after component has been updated
	afterUpdate(() => {
		if(list) scrollToBottom(element);
	})

	const scrollToBottom = async (node: any) => {
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
  }; 

	function addName() {
		list.push("Name");
		list=list;
	}
</script>

<article>
	<header>
		<h1>Channel {data.channelId}</h1>
	</header>
	<body bind:this={element} style="overflow: auto;">
		<ul>
			<li>
				<span style="color: #9F2B68">System</span> : Welcome to the channel {$user.profile?.username} !
			</li>
			{#each list as name}
				<li>
					name
				</li>
			{/each}
		</ul>
	</body>
		<footer>
			<div>
				<input type="text" style="margin: 0;margin-right: 1rem;text-indent: 2rem;">
				<iconify-icon on:click={() => {console.log("hello2")}} on:keypress icon="ic:baseline-send" style="font-size: 1.5rem;"></iconify-icon>
			</div>
		</footer>
</article>

<button on:click={addName}>
	add hello
</button>

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