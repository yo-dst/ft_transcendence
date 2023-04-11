import { c as create_ssr_component, b as subscribe, v as validate_component } from './index2-63bef90b.js';
import { L as Loading } from './Loading-2712611e.js';
import { c as chatSocket } from './chat-socket-ee959df8.js';
import './index-63b88ed9.js';

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $chatSocket, $$unsubscribe_chatSocket;
  $$unsubscribe_chatSocket = subscribe(chatSocket, (value) => $chatSocket = value);
  $$unsubscribe_chatSocket();
  return `${$chatSocket != void 0 ? `${slots.default ? slots.default({}) : ``}` : `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}`}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-0b802a7e.js.map
