import { c as create_ssr_component, b as subscribe, d as add_attribute } from './index2-63bef90b.js';
import { m as matchSocket } from './matchmaking-socket-f70c5197.js';
import './index-63b88ed9.js';

const css = {
  code: "h3.svelte-rub8w2.svelte-rub8w2{margin-bottom:1rem}.game-mode.svelte-rub8w2.svelte-rub8w2{display:flex;gap:1rem}.or.svelte-rub8w2.svelte-rub8w2{padding:0 2rem;display:flex;align-items:center;justify-content:space-around;margin-bottom:1rem}.or.svelte-rub8w2>.svelte-rub8w2:first-child{width:40%;height:0.5px;background-color:white;opacity:0.8}.or.svelte-rub8w2>.svelte-rub8w2:last-child{width:40%;height:0.5px;background-color:white;opacity:0.8}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_matchSocket;
  $$unsubscribe_matchSocket = subscribe(matchSocket, (value) => value);
  $$result.css.add(css);
  $$unsubscribe_matchSocket();
  return `<section><h3 class="${"svelte-rub8w2"}">Game mode</h3>
	<div class="${"game-mode svelte-rub8w2"}"><button${add_attribute("class", "", 0)}>🧢 Classic
		</button>
		<button${add_attribute("class", "outline", 0)}>⚡ Speed
		</button>
		<button${add_attribute("class", "outline", 0)}>👻 Ghost
		</button></div></section>

<section><h3 class="${"svelte-rub8w2"}">Find game</h3>
	<div class="${"find-game"}">${`<button>Play</button>`}
		<div class="${"or svelte-rub8w2"}"><span class="${"svelte-rub8w2"}"></span>
			<span class="${"svelte-rub8w2"}">or</span>
			<span class="${"svelte-rub8w2"}"></span></div>
		<button>Play vs friends</button></div></section>

${``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-de887321.js.map
