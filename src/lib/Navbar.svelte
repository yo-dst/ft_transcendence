    <script>
    import MainDrawer from "./mainDrawer.svelte";
    let open = false;
    let show = false;
</script>

<div class="main">

    <a href="/">
        <img src="pong-icon.svg" alt="icon pong" class="pong-icon"/>
    </a>
    <span>Transcendence</span>
    <li class="dropdown">
        <button type="button" class="pp dropbtn" on:blur={() => (show = false)} on:click={() => {show = true}}></button>
        <div class="dropdown-content" style:display={show ? 'block': 'none'}>
            <div class="first-block">
                <a href="/">Link 1</a>
            </div>
                <a href="/">Link 2</a>
                <a href="/">Link 3</a>
        </div>
    </li>
    <button type="button" class="menu" on:click={() => open = true}></button>
    <MainDrawer open={open}/>
</div>
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

    .xmark {
        width: 8vw;
        align-self: left;
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

    li {
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
  font-size: 0.875rem; /* 14px */
line-height: 1.25rem; /* 20px */
  text-decoration: none;
  text-align: left;
}

.dropdown-content a:hover {background-color: #f1f1f1;}
</style>