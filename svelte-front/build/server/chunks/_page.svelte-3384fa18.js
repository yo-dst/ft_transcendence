import { c as create_ssr_component, d as add_attribute } from './index2-63bef90b.js';

const css = {
  code: ".error.svelte-1km39it{margin-top:-0.5rem;margin-bottom:1.5rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let code = "";
  $$result.css.add(css);
  return `<h3>Google Authenticator code</h3>
<input name="${"code"}"${add_attribute("value", code, 0)}>
${``}
<button>Verify</button>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-3384fa18.js.map
