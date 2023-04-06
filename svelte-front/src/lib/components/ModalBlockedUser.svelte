<script lang="ts">
    import { blockUser, fetchBlockList, unblockUser } from "$lib/api";
    import { user } from "$lib/stores/user";

    export let closeModal: () => void;
    let userToBlock: string;
    let userToUnblock: string;
    fetchBlockList();
    console.log($user.blocked)
</script>

<dialog open>
    <article>
    <header style="display:flex;justify-content:center">
        <h1 style="margin: 0">Block list</h1>
    </header>
        <section>
            <div class="list-container bg-light-dark">
                <ul>
                    {#each $user.blocked as blockedUser}
                    <li>
                        <a href={`/profile/${blockedUser.username}`} style="margin-right:0.5rem">
                            <img src={blockedUser.avatar.url} alt="friend-request-creator"/>
                            <span>{blockedUser.username}</span>
                        </a>
                        <div class="friend-request-buttons">
                            <button on:click={() => unblockUser(blockedUser.username)} style="background-color: var(--del-color);">
                                <iconify-icon icon="charm:cross" style="font-size: 1.5rem;"/>
                            </button>
                        </div>
                    </li>
                    {/each}
                </ul>
            </div>
        </section>

        <input bind:value={userToBlock} on:keypress={(e) => {if (e.key === "Enter") {blockUser(userToBlock); userToBlock = ""}}} type="text" placeholder="Enter User to Block">
        <footer>
            <a href=" " role="button" class="secondary" id="move" on:click={closeModal}>Exit</a>
        </footer>
    </article>
</dialog>

<style>
    ul > li > a:hover img {
		transform: scale(1.05);
	}

	ul > li img {
		height: 3.5rem;
		width: auto;
		object-fit: cover;
		aspect-ratio: 1/1;
		border-radius: 50%;
		margin-right: 0.7rem;
	}

	ul > li button:hover {
		opacity: 0.9;
	}

	ul {
		padding: 0;
		margin: 0;
		width: 100%;
	}

	ul > li {
		display: flex;
		justify-content: space-between;
		background-color: #0d1117;
		list-style-type: none;
		border-radius: 5px;
		margin-bottom: 0.7rem;
		padding: 0.5rem 1rem;

	}

	ul > li:hover {
		background-color: #33383E;
		cursor: pointer;
	}

	ul > li:hover button {
		display: flex;
	}

	ul > li > a {
		width: 80%;
		display: flex;
		align-items: center;
		text-decoration: none;
		color: #f0f6fc;
	}

	ul > li > a:hover img {
		transform: scale(1.05);
	}

	ul > li img {
		height: 3.5rem;
		width: auto;
		object-fit: cover;
		aspect-ratio: 1/1;
		border-radius: 50%;
		margin-right: 0.7rem;
	}

	ul > li button {
		display: none;
		width: auto;
		height: auto;
		margin-bottom: 0;
		justify-content: center;
		align-items: center;
		border: none;
	}

	ul > li button:hover {
		opacity: 0.9;
	}

	.friend-request-buttons {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	@media (max-width: 700px) {
		ul > li button {
			display: flex;
		}
	}
</style>