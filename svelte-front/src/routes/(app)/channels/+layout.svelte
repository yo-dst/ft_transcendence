<script>
    import { goto } from "$app/navigation";
    import { user } from "$lib/stores/user";
    import { onMount } from "svelte";


	onMount(() => {
		if (!$user.isLoggedIn) {
			goto('/login');
		}
	})
</script>

<slot />