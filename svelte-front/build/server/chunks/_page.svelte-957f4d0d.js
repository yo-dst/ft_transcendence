import { c as create_ssr_component, b as subscribe, f as each, d as add_attribute, e as escape } from './index2-63bef90b.js';
import { e as eventsSocket } from './events-socket-e5c603aa.js';
import './index-63b88ed9.js';

const css = {
  code: "li.svelte-1hdwas8{cursor:pointer}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_eventsSocket;
  $$unsubscribe_eventsSocket = subscribe(eventsSocket, (value) => value);
  let users = [];
  $$result.css.add(css);
  $$unsubscribe_eventsSocket();
  return `<section><h3>Users logged in</h3>
	<ul>${each(users, (user) => {
    return `<li class="${"svelte-1hdwas8"}"><a${add_attribute("href", `/profile/${user}`, 0)}>${escape(user)}</a>
			</li>`;
  })}</ul>
</section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-957f4d0d.js.map
