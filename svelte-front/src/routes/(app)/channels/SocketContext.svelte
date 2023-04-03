<!-- SocketContext.svelte -->
<script>
	import { setContext } from 'svelte';
	export const SocketContext = setContext('socket', null);
  </script>
  
  {#if $SocketContext !== null}
	<SocketContext.Provider value={$SocketContext}>
	  {children}
	</SocketContext.Provider>
  {/if}
  