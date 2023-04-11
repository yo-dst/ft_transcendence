import { c as create_ssr_component, b as subscribe, d as add_attribute } from './index2-63bef90b.js';
import { u as user } from './user-91f221f3.js';
import './index-63b88ed9.js';

const css = {
  code: "h3.svelte-zq3usg.svelte-zq3usg{margin-bottom:1rem;font-weight:normal}.error.svelte-zq3usg.svelte-zq3usg{margin-top:-1.5rem}.logout-wrapper.svelte-zq3usg.svelte-zq3usg{margin-top:100px;display:block}.logout-wrapper.svelte-zq3usg a.svelte-zq3usg{width:100%;display:flex;justify-content:center;align-items:center;gap:0.5rem}.logout-wrapper.svelte-zq3usg a.svelte-zq3usg:hover{background-color:var(--contrast);color:black}@media(max-width: 700px){.logout-wrapper.svelte-zq3usg.svelte-zq3usg{display:none}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => value);
  let newUsername = "";
  let isTwoFactorAuthenticationEnabled;
  $$result.css.add(css);
  $$unsubscribe_user();
  return `<section><h3 class="${"svelte-zq3usg"}">Modify your account</h3>

	<label for="${"username"}">Username</label>
	<div class="${"input-button-container"}"><input name="${"username"}"${add_attribute("value", newUsername, 0)}>
		<button>Update</button></div>
${``}

	<label for="${"avatar"}">Avatar </label>
	<div class="${"input-button-container"}"><input name="${"avatar"}" type="${"file"}" accept="${"image/png image/jpeg image/jpg"}">
		<button>Update</button></div>
${``}

	<label for="${"isTwoFactorAuthenticationEnabled"}"><input type="${"checkbox"}" name="${"isTwoFactorAuthenticationEnabled"}" role="${"switch"}"${add_attribute("checked", isTwoFactorAuthenticationEnabled, 1)}>
	${`<span>Enable two factor authentication</span>`}</label></section>

<button style="${"width:40%; margin:0"}">Block list</button>
${``}

<div class="${"logout-wrapper svelte-zq3usg"}"><h3 class="${"svelte-zq3usg"}">Log in with another account</h3>
	<a href="${"/"}" role="${"button"}" class="${"contrast outline svelte-zq3usg"}"><iconify-icon icon="${"material-symbols:logout"}"></iconify-icon>
		Log out
	</a>
</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-a57b6e85.js.map
