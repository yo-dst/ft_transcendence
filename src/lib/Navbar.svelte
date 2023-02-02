<script>
    import Drawer from 'svelte-drawer-component'
    let open = false;
</script>

<div class="main">

    <button type="button" class="menu" on:click={() => open = true}></button>
    <img src="pong-icon.svg" alt="icon pong" class="pong-icon"/>
    <h1>ft_transcendence</h1>
    <button type="button" class="pp" ></button>
    
    <Drawer {open} size='50%' placement='left' on:clickAway={() => open=false}>
        <div class="drawer-container">
            <button class='close' on:click={() => open = false}><img src="xmark.svg" alt="xmark" class="xmark"></button>
            <a href="/">Play</a>
            <a href="/">Channels</a>
            <a href="/">Profil</a>
            <a href="/">Friends</a>
        </div>
    </Drawer>
</div>
    

<style>
    .main {
        background-color:aquamarine;
        display: flex;
        justify-content: space-between;
        margin: 5% 0;
        padding: 0 5%;
    }

    .pong-icon {
        width: 20%;
    }

    .drawer-container {
        display: flex;
        flex-direction: column;
    }

    .xmark {
        width: 8vw;
    }

    h1 {
        font-size: 100%;
    }

    button {
    background-color: transparent;
    background-size: cover;
    width: 10vw;
    border: none;
    }

    .menu {
        background-image: url(menu.svg);
    }

    .pp {
        background-image: url(default_pp.jpeg);
        border-radius: 50%;
    }
</style>