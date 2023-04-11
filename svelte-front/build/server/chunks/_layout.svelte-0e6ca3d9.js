import { c as create_ssr_component, v as validate_component, b as subscribe, d as add_attribute, e as escape, f as each, h as createEventDispatcher } from './index2-63bef90b.js';
import { u as user } from './user-91f221f3.js';
import { n as notifications } from './notifications-fd7bb082.js';
import { m as matchSocket } from './matchmaking-socket-f70c5197.js';
import { p as page } from './stores-095f0b18.js';
import './index-63b88ed9.js';

const css$5 = {
  code: ".drawer.svelte-1c92i6o.svelte-1c92i6o{position:fixed;top:0;left:0;height:100%;width:100%;z-index:-1;transition:z-index var(--duration) step-end}.drawer.open.svelte-1c92i6o.svelte-1c92i6o{z-index:99;transition:z-index var(--duration) step-start}.overlay.svelte-1c92i6o.svelte-1c92i6o{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(100, 100, 100, 0.5);opacity:0;z-index:2;transition:opacity var(--duration) ease}.drawer.open.svelte-1c92i6o .overlay.svelte-1c92i6o{opacity:1}.panel.svelte-1c92i6o.svelte-1c92i6o{position:fixed;width:100%;height:100%;background:white;z-index:3;transition:transform var(--duration) ease;overflow:auto}.panel.left.svelte-1c92i6o.svelte-1c92i6o{left:0;transform:translate(-100%, 0)}.panel.right.svelte-1c92i6o.svelte-1c92i6o{right:0;transform:translate(100%, 0)}.panel.top.svelte-1c92i6o.svelte-1c92i6o{top:0;transform:translate(0, -100%)}.panel.bottom.svelte-1c92i6o.svelte-1c92i6o{bottom:0;transform:translate(0, 100%)}.panel.left.size.svelte-1c92i6o.svelte-1c92i6o,.panel.right.size.svelte-1c92i6o.svelte-1c92i6o{max-width:var(--size)}.panel.top.size.svelte-1c92i6o.svelte-1c92i6o,.panel.bottom.size.svelte-1c92i6o.svelte-1c92i6o{max-height:var(--size)}.drawer.open.svelte-1c92i6o .panel.svelte-1c92i6o{transform:translate(0, 0)}",
  map: null
};
const Drawer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let { open = false } = $$props;
  let { duration = 0.2 } = $$props;
  let { placement = "left" } = $$props;
  let { size = null } = $$props;
  createEventDispatcher();
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
    $$bindings.duration(duration);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  $$result.css.add(css$5);
  style = `--duration: ${duration}s; --size: ${size};`;
  return `<aside class="${["drawer svelte-1c92i6o", open ? "open" : ""].join(" ").trim()}"${add_attribute("style", style, 0)}><div class="${"overlay svelte-1c92i6o"}"></div>

    <div class="${["panel " + escape(placement, true) + " svelte-1c92i6o", size ? "size" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>

</aside>`;
});
const css$4 = {
  code: ".drawer-container.svelte-1qxdv3w.svelte-1qxdv3w{background-color:#11191f;height:100%;display:flex;flex-direction:column}.profile-wrapper.svelte-1qxdv3w.svelte-1qxdv3w{display:flex;align-items:center;gap:0.7rem;padding:1rem 1rem;border-bottom:0.05rem solid var(--contrast)}.nav-wrapper.svelte-1qxdv3w.svelte-1qxdv3w{padding:1rem 1rem;height:100%;display:flex;flex-direction:column;justify-content:space-between}.drawer-container.svelte-1qxdv3w a.svelte-1qxdv3w{width:100%;display:flex;align-items:center;gap:1rem;cursor:pointer}.drawer-container.svelte-1qxdv3w a:hover iconify-icon.svelte-1qxdv3w{transform:translateX(0.15rem);transition:all 0.2s}img.svelte-1qxdv3w.svelte-1qxdv3w{border-radius:50%;width:35%;height:auto;object-fit:cover;aspect-ratio:1/1}iconify-icon.svelte-1qxdv3w.svelte-1qxdv3w{font-size:1.5rem}",
  map: null
};
const Drawer_1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let { show } = $$props;
  let { setShow } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.setShow === void 0 && $$bindings.setShow && setShow !== void 0)
    $$bindings.setShow(setShow);
  $$result.css.add(css$4);
  $$unsubscribe_user();
  return `${validate_component(Drawer, "Drawer").$$render(
    $$result,
    {
      open: show,
      size: "200px",
      placement: "left"
    },
    {},
    {
      default: () => {
        return `<div class="${"drawer-container svelte-1qxdv3w"}">${$user ? `<div class="${"profile-wrapper svelte-1qxdv3w"}"><img${add_attribute("src", $user.profile.avatar.url, 0)} alt="${"avatar"}" class="${"svelte-1qxdv3w"}">
			<span class="${"safe-words"}">${escape($user.profile.username)}</span></div>` : ``}
		<div class="${"nav-wrapper svelte-1qxdv3w"}"><nav><ul><li><a role="${"button"}" href="${"/"}" class="${"svelte-1qxdv3w"}"><iconify-icon icon="${"material-symbols:auto-read-play-outline-sharp"}" class="${"svelte-1qxdv3w"}"></iconify-icon>
							Play
						</a></li>
					<li><a role="${"button"}" href="${"/channels"}" class="${"svelte-1qxdv3w"}"><iconify-icon icon="${"material-symbols:chat-outline-sharp"}" class="${"svelte-1qxdv3w"}"></iconify-icon>
							Channels
						</a></li>
					<li><a role="${"button"}" href="${"/profile"}" class="${"svelte-1qxdv3w"}"><iconify-icon icon="${"carbon:user-profile"}" class="${"svelte-1qxdv3w"}"></iconify-icon>
							Profile
						</a></li>
					<li><a role="${"button"}" href="${"/friends"}" class="${"svelte-1qxdv3w"}"><iconify-icon icon="${"carbon:friendship"}" class="${"svelte-1qxdv3w"}"></iconify-icon>
							Friends
						</a></li></ul></nav>
			<nav><ul><li><a role="${"button"}" class="${"contrast svelte-1qxdv3w"}" href="${"/parameters"}"><iconify-icon icon="${"mdi:cog"}" class="${"svelte-1qxdv3w"}"></iconify-icon>
							Parameters
						</a></li>
				${$user ? `<li><a href="${"/"}" role="${"button"}" class="${"contrast outline svelte-1qxdv3w"}"><iconify-icon icon="${"material-symbols:logout"}" class="${"svelte-1qxdv3w"}"></iconify-icon>
							Log out
						</a></li>` : ``}</ul></nav></div></div>`;
      }
    }
  )}`;
});
const css$3 = {
  code: ".notifications-container.svelte-1siphhu.svelte-1siphhu.svelte-1siphhu{position:absolute;top:var(--top);right:5px;background-color:#161b22;box-shadow:-5px 5px 5px #0d1117;width:450px;max-width:95vw}ul.svelte-1siphhu.svelte-1siphhu.svelte-1siphhu{margin:0;padding:0.5rem}ul.svelte-1siphhu li.svelte-1siphhu.svelte-1siphhu{background-color:#0d1117;padding:0.3rem;list-style:none;margin-bottom:0.5rem;display:flex;justify-content:space-between;align-items:center;gap:1rem}ul.svelte-1siphhu li.svelte-1siphhu>.svelte-1siphhu:first-child{display:flex;align-items:center;gap:0.5rem}ul.svelte-1siphhu li>:first-child img.svelte-1siphhu.svelte-1siphhu{width:48px;height:48px;object-fit:cover;aspect-ratio:1/1;border-radius:50%}button.svelte-1siphhu.svelte-1siphhu.svelte-1siphhu{border:none;--primary-focus:transparent;margin-bottom:0;padding:0.4rem;display:flex;justify-content:center;align-items:center}button.svelte-1siphhu:hover iconify-icon.svelte-1siphhu.svelte-1siphhu{transform:scale(1.05)}.button-wrapper.svelte-1siphhu.svelte-1siphhu.svelte-1siphhu{display:flex;gap:0.5rem;margin-left:1rem}.decline-button.svelte-1siphhu.svelte-1siphhu.svelte-1siphhu{background-color:var(--del-color)}.accept-button.svelte-1siphhu.svelte-1siphhu.svelte-1siphhu{background-color:var(--ins-color)}",
  map: null
};
const Notifications = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $notifications, $$unsubscribe_notifications;
  let $$unsubscribe_matchSocket;
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  $$unsubscribe_matchSocket = subscribe(matchSocket, (value) => value);
  let { show } = $$props;
  let { top } = $$props;
  if ($$props.show === void 0 && $$bindings.show && show !== void 0)
    $$bindings.show(show);
  if ($$props.top === void 0 && $$bindings.top && top !== void 0)
    $$bindings.top(top);
  $$result.css.add(css$3);
  $$unsubscribe_notifications();
  $$unsubscribe_matchSocket();
  return `${show ? `<div class="${"notifications-container svelte-1siphhu"}" style="${"--top:" + escape(top, true) + "px"}"><ul class="${"svelte-1siphhu"}">${each($notifications, (notification) => {
    return `<li class="${"svelte-1siphhu"}"><div class="${"svelte-1siphhu"}"><img${add_attribute("src", notification.data.creator.avatar.url, 0)} alt="${"avatar"}" class="${"svelte-1siphhu"}">
					<span>${escape(notification.data.creator.username)}
						${notification.type === "game-request" ? `challenged you` : `wants to be your friend`}
					</span></div>
				<div class="${"button-wrapper svelte-1siphhu"}">${notification.type === "friend-request" ? `<button class="${"accept-button svelte-1siphhu"}"><iconify-icon icon="${"fluent-mdl2:accept-medium"}" class="${"svelte-1siphhu"}"></iconify-icon></button>
						<button class="${"decline-button svelte-1siphhu"}"><iconify-icon icon="${"radix-icons:cross-2"}" class="${"svelte-1siphhu"}"></iconify-icon>
						</button>` : `${notification.type === "game-request" ? `<button class="${"accept-button svelte-1siphhu"}"><iconify-icon icon="${"fluent-mdl2:accept-medium"}" class="${"svelte-1siphhu"}"></iconify-icon></button>
						<button class="${"decline-button svelte-1siphhu"}"><iconify-icon icon="${"radix-icons:cross-2"}" class="${"svelte-1siphhu"}"></iconify-icon>
						</button>` : ``}`}</div>
			</li>`;
  })}</ul></div>` : ``}`;
});
const PongIcon = "/_app/immutable/assets/pong-icon-1e1f9c40.svg";
const css$2 = {
  code: "button.svelte-11x9ko6:focus{--primary-focus:transparent}.header.svelte-11x9ko6{background-color:#161b22;display:flex;justify-content:space-between;align-items:center;height:50px;padding:0 0.3rem}.pong-icon.svelte-11x9ko6{height:30px;width:auto}.hamburger-button.svelte-11x9ko6{background-color:transparent;width:45px;height:45px;display:flex;justify-content:center;align-items:center;margin-bottom:0;border:none}.header-profile.svelte-11x9ko6{display:flex;justify-content:center;align-items:center}.ring-wrapper.svelte-11x9ko6{position:relative;background-color:transparent;border:none;margin-bottom:0;padding:0}.ring-notif.svelte-11x9ko6{position:absolute;background-color:var(--del-color);width:1.2rem;height:1.2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;right:-1px;top:3px}",
  map: null
};
const NavbarMobile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  let showDrawer = false;
  let showNotif = false;
  function setShowDrawer(val) {
    showDrawer = val;
  }
  $$result.css.add(css$2);
  $$unsubscribe_user();
  $$unsubscribe_notifications();
  return `<div class="${"header svelte-11x9ko6"}"><button class="${"hamburger-button svelte-11x9ko6"}"><iconify-icon icon="${"charm:menu-hamburger"}" style="${"font-size: 50px; color: #f0f6fc;"}"></iconify-icon></button>
    <a href="${"/"}"><img${add_attribute("src", PongIcon, 0)} alt="${"icon pong"}" class="${"pong-icon svelte-11x9ko6"}"></a>
    <div class="${"header-profile svelte-11x9ko6"}">${$user ? `<button class="${"ring-wrapper svelte-11x9ko6"}"><iconify-icon icon="${"mdi:bell-ring"}" style="${"font-size: 40px; color: #f0f6fc;"}"></iconify-icon>
            <span class="${"ring-notif svelte-11x9ko6"}">${escape($notifications.length)}</span></button>` : ``}</div></div>
${validate_component(Drawer_1, "Drawer").$$render($$result, { show: showDrawer, setShow: setShowDrawer }, {}, {})}
${validate_component(Notifications, "Notifications").$$render($$result, { show: showNotif, top: 55 }, {}, {})}`;
});
const css$1 = {
  code: ".header.svelte-1dj4921.svelte-1dj4921{background-color:#161b22;height:65px;display:flex;align-items:center;justify-content:space-between;width:100%;padding:0 2rem}.header.svelte-1dj4921>.svelte-1dj4921:last-child{display:flex;gap:1rem;align-items:center}.pong-icon.svelte-1dj4921.svelte-1dj4921{height:45px;width:auto;cursor:pointer}nav.svelte-1dj4921 ul li a.svelte-1dj4921{color:#f0f6fc}.active.svelte-1dj4921.svelte-1dj4921{text-decoration:underline;text-underline-offset:0.3rem}nav.svelte-1dj4921 ul li a.svelte-1dj4921:hover{transform:scale(1.1)}.ring-wrapper.svelte-1dj4921.svelte-1dj4921{display:flex;align-items:center;justify-content:center;position:relative;background-color:transparent;border:none;margin-bottom:0;padding:0;--primary-focus:transparent}.ring-notif.svelte-1dj4921.svelte-1dj4921{position:absolute;background-color:var(--del-color);width:1.2rem;height:1.2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;right:-1px;top:3px}.img-avatar.svelte-1dj4921.svelte-1dj4921{cursor:pointer;height:45px;width:45px;border-radius:50%;object-fit:cover;aspect-ratio:1/1}",
  map: null
};
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  let $user, $$unsubscribe_user;
  let $notifications, $$unsubscribe_notifications;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_notifications = subscribe(notifications, (value) => $notifications = value);
  let showNotif = false;
  const links = [
    { name: "Play", path: "/" },
    { name: "Channels", path: "/channels" },
    { name: "Profile", path: "/profile" },
    { name: "Friends", path: "/friends" }
  ];
  $$result.css.add(css$1);
  $$unsubscribe_page();
  $$unsubscribe_user();
  $$unsubscribe_notifications();
  return `<div class="${"header svelte-1dj4921"}"><img${add_attribute("src", PongIcon, 0)} alt="${"icon pong"}" class="${"pong-icon svelte-1dj4921"}">
	<nav class="${"svelte-1dj4921"}"><ul>${each(links, (link) => {
    return `<li><a${add_attribute("href", link.path, 0)} class="${["svelte-1dj4921", $page.url.pathname === link.path ? "active" : ""].join(" ").trim()}">${escape(link.name)}</a>
			</li>`;
  })}</ul></nav>
	<div class="${"svelte-1dj4921"}">${$user ? `<button class="${"ring-wrapper svelte-1dj4921"}"><iconify-icon icon="${"mdi:bell-ring"}" style="${"font-size: 45px; color: #f0f6fc;"}"></iconify-icon>
			<span class="${"ring-notif svelte-1dj4921"}">${escape($notifications.length)}</span></button>
		<img${add_attribute("src", $user.profile.avatar.url, 0)} alt="${"avatar"}" class="${"img-avatar svelte-1dj4921"}">` : `<iconify-icon icon="${"mdi:user"}" style="${"font-size: 50px; color: #f0f6fc;"}"></iconify-icon>`}</div></div>
${validate_component(Notifications, "Notifications").$$render($$result, { show: showNotif, top: 70 }, {}, {})}`;
});
const css = {
  code: "header.svelte-19gzlz7{margin-bottom:25px}main.svelte-19gzlz7{margin-bottom:75px;max-width:500px}.navbar-mobile.svelte-19gzlz7{display:none}.navbar.svelte-19gzlz7{display:block}footer.svelte-19gzlz7{position:absolute;height:50px;left:0;bottom:0;width:100%;background-color:#161b22;display:flex;justify-content:center;align-items:center;color:var(--color)}@media(max-width: 700px){.navbar-mobile.svelte-19gzlz7{display:block}.navbar.svelte-19gzlz7{display:none}}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<header class="${"svelte-19gzlz7"}"><div class="${"navbar-mobile svelte-19gzlz7"}">${validate_component(NavbarMobile, "NavbarMobile").$$render($$result, {}, {}, {})}</div>
	<div class="${"navbar svelte-19gzlz7"}">${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}</div></header>
<main class="${"container svelte-19gzlz7"}">${slots.default ? slots.default({}) : ``}</main>
<footer class="${"svelte-19gzlz7"}"><div><span>Made with love by <a href="${"https://github.com/nferre"}">him</a>, <a href="${"https://github.com/yo-dst"}">I</a> and <a href="${"https://fr.wikipedia.org/wiki/Angelina_Jolie"}">her </a></span></div>
</footer>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-0e6ca3d9.js.map
