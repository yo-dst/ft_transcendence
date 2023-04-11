import { c as create_ssr_component, b as subscribe, d as add_attribute, e as escape } from './index2-63bef90b.js';
import { c as chatSocket } from './chat-socket-ee959df8.js';
import './index-63b88ed9.js';

const css = {
  code: "button.svelte-1785aeq{margin-top:1.5rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_chatSocket;
  $$unsubscribe_chatSocket = subscribe(chatSocket, (value) => value);
  let isPrivate = false;
  let name;
  let password;
  let capacity = 25;
  let error = "";
  $$result.css.add(css);
  $$unsubscribe_chatSocket();
  return `<section><form><label for="${"name"}">Name</label>
		<input type="${"text"}" name="${"name"}" placeholder="${"Name"}" required${add_attribute("value", name, 0)}>
		<p style="${"color:red"}">${escape(error)}</p>

		<label for="${"size"}">Capacity <kbd style="${"margin-left: 0.5rem;"}">${escape(capacity)}</kbd></label>
		<input type="${"range"}" min="${"1"}" max="${"50"}" name="${"capacity"}"${add_attribute("value", capacity, 0)}>
		<label for="${"password"}">Password</label>
		<input type="${"text"}" name="${"password"}" placeholder="${"Password"}"${add_attribute("value", password, 0)}>
		<small>Leave it empty if you don&#39;t want a password</small>

		<fieldset><label for="${"switch"}"><input type="${"checkbox"}" id="${"switch"}" name="${"switch"}" role="${"switch"}"${add_attribute("checked", isPrivate, 1)}>
				Private
				<small style="${"padding-top: 0.5rem;margin:0;"}">Private rooms will not appear in the listing</small></label></fieldset>

		<button class="${"svelte-1785aeq"}">Create channel</button></form>
</section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-7027ce9d.js.map
