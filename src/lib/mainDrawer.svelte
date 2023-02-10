<script>
    import Drawer from 'svelte-drawer-component'
    export let open;
</script>

<Drawer {open} size='50%' placement='left' on:clickAway={() => open=false}>
    <div class="drawer-container">
        <button class='close' on:click={() => open = false}><img src="xmark.svg" alt="xmark" class="xmark"></button>
        <a href="/">Play</a>
        <a href="/">Channels</a>
        <a href="/">Profil</a>
        <a href="/">Friends</a>
    </div>
</Drawer>

<style>
        .drawer-container {
        display: flex;
        flex-direction: column;
        padding: 0% 5%;
    }

    .drawer-container a {
        padding-bottom: 5%;
    }

    .xmark {
        width: 8vw;
        align-self: left;
    }
</style>