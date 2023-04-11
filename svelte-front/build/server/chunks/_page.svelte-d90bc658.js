import { c as create_ssr_component, v as validate_component, d as add_attribute } from './index2-63bef90b.js';

const CanvasQrCode = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { qrCodeData } = $$props;
  let { width } = $$props;
  let { height } = $$props;
  let canvas;
  if ($$props.qrCodeData === void 0 && $$bindings.qrCodeData && qrCodeData !== void 0)
    $$bindings.qrCodeData(qrCodeData);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0)
    $$bindings.height(height);
  return `<canvas${add_attribute("width", width, 0)}${add_attribute("height", height, 0)}${add_attribute("this", canvas, 0)}></canvas>`;
});
const css = {
  code: "h3.svelte-3ngphy{margin-bottom:1.5rem}input.svelte-3ngphy{margin-top:2rem}.error.svelte-3ngphy{margin-top:-0.5rem;margin-bottom:1.5rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let qrCodeData = "";
  let code = "";
  $$result.css.add(css);
  return `<h3 class="${"svelte-3ngphy"}">Scan with Google Authenticator</h3>
${validate_component(CanvasQrCode, "CanvasQrCode").$$render($$result, { qrCodeData, width: 300, height: 300 }, {}, {})}
<input name="${"code"}" class="${"svelte-3ngphy"}"${add_attribute("value", code, 0)}>
${``}
<button type="${"submit"}">Verify code</button>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-d90bc658.js.map
