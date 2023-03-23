<script lang="ts">
    import { user } from "$lib/stores/user";

    let answer = "";

    async function test2fa() {
        const res = await fetch("http://localhost:3000/2fa/test", {
            credentials: "include"
        });
        answer = res.ok ? "yes" : "no";
    }
</script>

<h1>Testing 2fa</h1>
<pre>{JSON.stringify($user, undefined, 2)}</pre>
<p>Is two factor authentication working? {answer}</p>
<button on:click={test2fa}>Test</button>
