<script lang="ts">
    import Notifications from "./Notifications.svelte";
	import { user } from "$lib/stores/user";
    import { goto } from "$app/navigation";
	import { page } from "$app/stores";

	let showNotif = false;
    let numberNotif = 2;

	const links = [
		{
			name: "Play",
			path: "/"
		},
		{
			name: "Channels",
			path: "/channels"
		},
		{
			name: "Profile",
			path: "/profile"
		},
		{
			name: "Friends",
			path: "/friends"
		}
	];
</script>

<div class="header">
    <img src="pong-icon.svg" 
		alt="icon pong"
		on:click={() => goto("/")}
		on:keypress
		class="pong-icon"/>
	<nav>
		<ul>
		{#each links as link}
			<li>
				<a href={link.path} class:active={$page.url.pathname === link.path}>
					{link.name}
				</a>
			</li>
		{/each}
		</ul>
	</nav>
	<div>
		<button class="ring-wrapper" on:click={() => showNotif = !showNotif}>
			<iconify-icon icon="mdi:bell-ring" style="font-size: 40px; color: #f0f6fc;"></iconify-icon>
			<span class="ring-notif">{numberNotif}</span>
		</button>
	{#if $user.isLoggedIn}
		<img src={$user.profile?.avatar?.url}
			alt="avatar"
			on:click={() => goto("/parameters")}
			on:keypress
			class="img-avatar"/>
	{:else}
		<iconify-icon icon="mdi:user" style="font-size: 45px; color: #f0f6fc;"></iconify-icon>
	{/if}
	</div>
</div>
<Notifications show={showNotif} top={70}/>

<style>
	.header {
		background-color: #161b22;
		height: 65px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0 2rem;
	}

	.header > :last-child {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.pong-icon {
        height: 40px;
        width: auto;
		cursor: pointer;
    }

	nav ul li a {
		color: #f0f6fc;
	}

	.active {
		text-decoration: underline;
		text-underline-offset: 0.3rem;
	}

	nav ul li a:hover {
		transform: scale(1.1);
	}

	.ring-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
        position: relative;
        background-color: transparent;
        border: none;
        margin-bottom: 0;
        padding: 0;
		--primary-focus: transparent;
    }

    .ring-notif {
        position: absolute;
        background-color: var(--del-color);
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        right: -1px;
        top: 3px;
    }

	.img-avatar {
		cursor: pointer;
		height: 40px;
		width: 40px;
		border-radius: 50%;
		object-fit: cover;
		aspect-ratio: 1/1;
	}
</style>