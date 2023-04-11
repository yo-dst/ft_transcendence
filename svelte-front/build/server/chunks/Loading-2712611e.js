import { c as create_ssr_component, v as validate_component, e as escape } from './index2-63bef90b.js';

const css = {
  code: ".circle.svelte-dqjlks{height:var(--size);width:var(--size);border-color:var(--color) transparent var(--color) var(--color);border-width:calc(var(--size) / 15);border-style:solid;border-image:initial;border-radius:50%;animation:var(--duration) linear 0s infinite normal none running svelte-dqjlks-rotate}.pause-animation.svelte-dqjlks{animation-play-state:paused}@keyframes svelte-dqjlks-rotate{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}",
  map: null
};
const Circle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { color = "#FF3E00" } = $$props;
  let { unit = "px" } = $$props;
  let { duration = "0.75s" } = $$props;
  let { size = "60" } = $$props;
  let { pause = false } = $$props;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.unit === void 0 && $$bindings.unit && unit !== void 0)
    $$bindings.unit(unit);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.pause === void 0 && $$bindings.pause && pause !== void 0)
    $$bindings.pause(pause);
  $$result.css.add(css);
  return `<div class="${["circle svelte-dqjlks", pause ? "pause-animation" : ""].join(" ").trim()}" style="${"--size: " + escape(size, true) + escape(unit, true) + "; --color: " + escape(color, true) + "; --duration: " + escape(duration, true)}"></div>`;
});
const Loading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Circle, "Circle").$$render(
    $$result,
    {
      size: "60",
      color: "#FF3E00",
      unit: "px",
      duration: "1s"
    },
    {},
    {}
  )}`;
});

export { Loading as L };
//# sourceMappingURL=Loading-2712611e.js.map
