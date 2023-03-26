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
			$user = undefined;
			goto("/login");
		}
	}

    onMount(() => {
        const elements = document.getElementsByTagName("a");
        for (let i = 0; i < elements.length; ++i) {
            elements[i].addEventListener("click", () => {
                setShow(false);
            });
        }
    });
</script>

<Drawer open={show} size='200px' placement='left' on:clickAway={() => setShow(false)}>
    <div class="drawer-container">
        {#if $user}
            <div class="profile-wrapper">
                <img src={$user?.avatar} alt="avatar"/>
                <span>{$user.username}</span>
            </div>
        {/if}
        <div class="nav-wrapper">
            <nav>
                <ul>
                    <li>
                        <a role="button" href="/">
                            <iconify-icon icon="material-symbols:auto-read-play-outline-sharp"></iconify-icon>
                            Play
                        </a>
                    </li>
                    <li>
                        <a role="button" href="/channels">
                            <iconify-icon icon="material-symbols:chat-outline-sharp"></iconify-icon>
                            Channels
                        </a>
                    </li>
                    <li>
                        <a role="button" href="/profile">
                            <iconify-icon icon="carbon:user-profile"></iconify-icon>
                            Profile
                        </a>
                    </li>
                    <li>
                        <a role="button" href="/friends">
                            <iconify-icon icon="carbon:friendship"></iconify-icon>
                            Friends
                        </a>
                    </li>
                </ul>
            </nav>
            <nav>
                <ul>
                    <li>
                        <a role="button" class="contrast" href="/parameters">
                            <iconify-icon icon="mdi:cog"></iconify-icon>
                            Parameters
                        </a>
                    </li>
                    <li>
                        {#if $user}
                            <a href="/" role="button" class="contrast outline" on:click={logout}>
                                <iconify-icon icon="material-symbols:logout"></iconify-icon>
                                Log Out
                            </a>
                        {:else}
                            <a role="button" class="contrast outline" href="https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-7470221ce45a9a6950c2b7324e6e5a9a069460af572ce5daa2a0fb547a3d5fda&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin&response_type=code">
                                <iconify-icon icon="material-symbols:login"></iconify-icon>
                                Log In
                            </a>
                        {/if}
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</Drawer>

<style>
	.drawer-container {
		background-color: var(--background-color);
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
	}

    img {
        border-radius: 50%;
        width: 60px;
        height: 60px;
    }

	iconify-icon {
		font-size: 1.5rem;
	}
</style>
