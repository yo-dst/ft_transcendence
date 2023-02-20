<script lang="ts">
    import Drawer from "./Drawer.svelte";
    import Notifications from "./Notifications.svelte";

    let showDrawer = false;
    function setShowDrawer(val: boolean) {
        showDrawer = val;
    }

    let showNotif = false;

    let userLoggedIn = false;
</script>

<div class="header">
    <button class="hamburger-button" on:click={() => setShowDrawer(true)}>
        <iconify-icon icon="charm:menu-hamburger" style="font-size: 50px; color: var(--contrast);"></iconify-icon>
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
                <iconify-icon icon="mdi:bell-ring" style="font-size: 40px; color: var(--contrast);"></iconify-icon>
                <span class="ring-notif">2</span>
            </button>
            <!-- <iconify-icon icon="mdi:user-circle" ></iconify-icon> -->
        {/if}
    </div>
    <!-- <span>Transcendence</span> -->
    <!-- <li class="dropdown">
        <button type="button" class="pp dropbtn" on:blur={() => (show = false)} on:click={() => {show = true}}></button>
        <div class="dropdown-content" style:display={show ? 'block': 'none'}>
            <div class="first-block">
                <a href="/">Link 1</a>
            </div>
                <a href="/">Link 2</a>
                <a href="/">Link 3</a>
        </div>
    </li> -->
</div>
<Drawer show={showDrawer} setShow={setShowDrawer}/>
<Notifications show={showNotif}/>

<style>
    button:focus {
        --primary-focus: transparent;
    }

    .header {
        background-color: #090D10;
        /* background-color: #030405; */
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

    /* li {
        float: left;
    }

    li a, .dropbtn {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    }

    li a:hover, .dropdown:hover .dropdown-content {
        display: block;
    }

    li.dropdown {
    display: inline-block;
    }

    .dropdown-content {
    display: none;
    position: absolute;
    transform: translateX(-38%);
    margin-top: 0.25rem;
    background-color: rgb(255 255 255);
    border-color: rgb(236, 55, 0);
    min-width: 160px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);    
    border-radius: 0.5rem;
    z-index: 1;
    }

    .dropdown-content a {
    color: rgb(17 24 39);
    padding: 0.75rem 1rem;
    font-size: 0.875rem; 14px
    line-height: 1.25rem; 20px
    text-decoration: none;
    text-align: left;
    }

    .dropdown-content a:hover {background-color: #f1f1f1;} */
</style>