<script lang="ts">
    import Drawer from 'svelte-drawer-component';
    import { user } from "../stores";
    
    export let show;
    export let setShow;

    async function logout() {
        const res = await fetch("http://localhost:3000/auth/logout", {
            credentials: "include"
        });
        if (res.ok) {
            $user = null;
        }
    }
</script>

<Drawer open={show} size='200px' placement='left' on:clickAway={() => setShow(false)}>
    <div class="drawer-container">
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
                        <a href="/#" role="button" on:click={logout} class="contrast outline">
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
</Drawer>

<style>
    .drawer-container {
        background-color: var(--background-color);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 1rem 1rem;
    }

    .drawer-container a {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    iconify-icon {
        font-size: 1.5rem;
    }
</style>