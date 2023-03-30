<script lang="ts">
    import Drawer from "./Drawer.svelte";
    import Notifications from "./Notifications.svelte";

    let showDrawer = false;
    function setShowDrawer(val: boolean) {
        showDrawer = val;
    }

    let showNotif = false;
    let userLoggedIn = false;
    let numberNotif = 2;
</script>

<div class="header">
    <button class="hamburger-button" on:click={() => setShowDrawer(true)}>
        <iconify-icon icon="charm:menu-hamburger" style="font-size: 50px; color: #f0f6fc;"></iconify-icon>
    </button>
    <a href="/">
        <img src="pong-icon.svg" alt="icon pong" class="pong-icon"/>
    </a>
    <div class="header-profile">
    {#if userLoggedIn}
        <img src="https://picsum.photos/200" alt="profile" class="header-profile-img"/>
    {:else}
        <!-- <iconify-icon icon="mdi:user" style="font-size: 50px; color: var(--contrast);"></iconify-icon> -->
        <button class="ring-wrapper" on:click={() => showNotif = !showNotif}>
            <iconify-icon icon="mdi:bell-ring" style="font-size: 40px; color: #f0f6fc;"></iconify-icon>
            <span class="ring-notif">{numberNotif}</span>
        </button>
    {/if}
    </div>
</div>
<Drawer show={showDrawer} setShow={setShowDrawer}/>
<Notifications show={showNotif}/>

<style>
    button:focus {
        --primary-focus: transparent;
    }

    .header {
        background-color: #161b22;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;
        padding: 0 0.3rem;
    }

    .pong-icon {
        height: 30px;
        width: auto;
    }

    .hamburger-button {
        background-color: transparent;
        width: 45px;
        height: 45px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 0;
        border: none;
    }

    .header-profile {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header-profile-img {
        height: 45px;
        width: auto;
        border-radius: 50%;
    }

    .ring-wrapper {
        position: relative;
        background-color: transparent;
        border: none;
        margin-bottom: 0;
        padding: 0;
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
</style>