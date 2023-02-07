<script lang="ts">
	let gridItems: number[] = [];

	function addItem() {
		gridItems = [...gridItems, gridItems.length + 1]
	}

	function delItem() {
		if (gridItems.length) {
			gridItems.pop();
			gridItems = gridItems;
		}
	}

	let isInvalid = false;
</script>

<h1>
	Main Page
	<iconify-icon icon="material-symbols:home-outline" style="color: red; font-size: 1.5em;"></iconify-icon>
</h1>
<section>
	<a href="https://picocss.com/examples/classless/">Go see their official page example</a>
</section>
<section>
	<button>Just flexing with pico</button>
	<button class="outline">Just flexing with pico</button>
	<button class="outline contrast">Just flexing with pico</button>
	<button class="secondary">Just flexing with pico</button>
	<a href="/" role="button">This is an 'a' tag</a>
</section>
<section>
	<button on:click={addItem}>Add Item</button>
	<button on:click={delItem}>Delete Item</button>
	<div class="grid">
		{#each gridItems as item, key}
			<div class="grid-item">{item}</div>
		{/each}
	</div>
</section>
<section>
	<button on:click={() => isInvalid = !isInvalid}>
		{#if isInvalid}
			set as valid
		{:else}
			set as invalid
		{/if}
	</button>
	<input type="text" placeholder="switch me" aria-invalid={isInvalid}>
</section>
	
<style>
	h1 {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.grid-item {
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid white;
	}
</style>