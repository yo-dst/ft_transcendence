<script>
    import Drawer from 'svelte-drawer-component'
    let open = false
</script>

<button on:click={() => open = true}>Open</button>
<Drawer { open } size='60%' placement="left" on:clickAway={() => open = false}>
    <button on:click={() => open = false}>Close</button>
	<p>random shit</p>
	<p>random shit</p>
	<p>random shit</p>
</Drawer>