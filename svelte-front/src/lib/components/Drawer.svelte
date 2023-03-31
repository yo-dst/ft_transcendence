<script lang="ts">
	import { onMount } from "svelte";
	import Drawer from "svelte-drawer-component";
	import { user } from "$lib/stores/user";
	import { goto } from "$app/navigation";

	export let show: boolean;
	export let setShow: any;

	async function logout() {
		const res = await fetch("http://localhost:3000/auth/logout", {
			credentials: "include",
		});
		if (res.ok) {
			$user.isLoggedIn = false;
			$user.profile = undefined;
			goto("/login");
		}
	}

	onMount(async () => {
		console.log("drawer mounting...");

		const elements = document.getElementsByTagName("a");
		for (let i = 0; i < elements.length; ++i) {
			elements[i].addEventListener("click", () => {
				setShow(false);
			});
		}
	});
</script>

<Drawer
	open={show}
	size="200px"
	placement="left"
	on:clickAway={() => setShow(false)}
>
	<div class="drawer-container">
	{#if $user.isLoggedIn}
		<div class="profile-wrapper">
			<img src={$user.profile?.avatar?.url} alt="avatar" />
			<span class="safe-words">{$user.profile?.username}</span>
		</div>
	{/if}
		<div class="nav-wrapper">
			<nav>
				<ul>
					<li>
						<a role="button" href="/">
							<iconify-icon icon="material-symbols:auto-read-play-outline-sharp"/>
							Play
						</a>
					</li>
					<li>
						<a role="button" href="/channels">
							<iconify-icon icon="material-symbols:chat-outline-sharp"/>
							Channels
						</a>
					</li>
					<li>
						<a role="button" href="/profile">
							<iconify-icon icon="carbon:user-profile"/>
							Profile
						</a>
					</li>
					<li>
						<a role="button" href="/friends">
							<iconify-icon icon="carbon:friendship"/>
							Friends
						</a>
					</li>
				</ul>
			</nav>
			<nav>
				<ul>
					<li>
						<a role="button" class="contrast" href="/parameters">
							<iconify-icon icon="mdi:cog" />
							Parameters
						</a>
					</li>
				{#if $user.isLoggedIn}
					<li>
						<a href="/" role="button" on:click={logout} class="contrast outline">
							<iconify-icon icon="material-symbols:logout" />
							Log out
						</a>
					</li>
				{/if}
				</ul>
			</nav>
		</div>
	</div>
</Drawer>

<style>
	.drawer-container {
		background-color: #11191f;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.profile-wrapper {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		padding: 1rem 1rem;
		border-bottom: 0.05rem solid var(--contrast);
	}

	.nav-wrapper {
		padding: 1rem 1rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.drawer-container a {
		width: 100%;
		display: flex;
		align-items: center;
		gap: 1rem;
		cursor: pointer;
	}

	.drawer-container a:hover iconify-icon {
		transform: translateX(0.15rem);
		transition: all 0.2s;
	}

    img {
        border-radius: 50%;
        width: 35%;
        height: auto;
        object-fit: cover;
        aspect-ratio: 1/1;
    }

	iconify-icon {
		font-size: 1.5rem;
	}
</style>
