<script>
    import Drawer from 'svelte-drawer-component'
    let open = false;
</script>

<div class="main">

    <a href="/">
        <img src="pong-icon.svg" alt="icon pong" class="pong-icon"/>
    </a>
    <span>Transcendence</span>
    <button type="button" class="pp" ></button>
    <button type="button" class="menu" on:click={() => open = true}></button>
 
</div>
    <Drawer {open} size='50%' placement='left' on:clickAway={() => open=false}>
        <div class="drawer-container">
            <button class='close' on:click={() => open = false}>
                <iconify-icon icon="fa6-solid:xmark" style="color: black;"></iconify-icon>
                Close
            </button>
            <a href="/">Play</a>
            <a href="/">Channels</a>
            <a href="/profile">Profile</a>
            <a href="/friends">Friends</a>
            <a href="/game">Game</a>
            <a href="/login">Log In</a>
            <a href="/register">Register</a>
        </div>
    </Drawer>
    

<style>
    .main {
        background-color:aquamarine;
        display: flex;
        justify-content: space-between;
        margin-left: auto;
        margin-right: auto;
        margin-top: 0.625rem;
        padding-right: 1rem;
        padding-left: 1rem;
        align-items: center;
    }

    .pong-icon {
        height: 1.5rem;
    }

    .drawer-container {
        display: flex;
        flex-direction: column;
        padding: 0% 5%;
    }

    .drawer-container a {
        padding-bottom: 5%;
    }

    .drawer-container a:focus {
        background-color: transparent;
    }

    span {
        font-weight: 400;
        font-size: 1.25rem;
        line-height: 1.75rem;
        align-self: center;
        margin-left: 0.8rem;
        margin-right: 1.5rem;
    }

    button {
        display: flex;
        align-items: center;
        color: black;
        gap: 0.5em;
        background-color: transparent;
        background-size: cover;
        border: none;
        height: 2.5rem;
        width: 2.5rem;
    }

    .main button {
        margin-left: auto;
        margin-right: auto;
    }

    .menu {
        background-image: url(menu.svg);
    }

    .pp {
        background-image: url(default_pp.jpeg);
        border-radius: 50%;
    }
</style>