import { c as create_ssr_component, b as subscribe, d as add_attribute, f as each, e as escape } from './index2-63bef90b.js';
import { a as friendRequests, f as friends } from './friends-b3bd2ca5.js';
import './index-63b88ed9.js';

const css = {
  code: "h3.svelte-6zytsb.svelte-6zytsb.svelte-6zytsb{margin-bottom:1rem;font-weight:normal;margin-left:0.5rem}ul.svelte-6zytsb.svelte-6zytsb.svelte-6zytsb{padding:0;margin:0;width:100%}ul.svelte-6zytsb>li.svelte-6zytsb.svelte-6zytsb{display:flex;justify-content:space-between;align-items:center;background-color:#0d1117;list-style-type:none;border-radius:5px;margin-bottom:0.7rem;padding:0.5rem 1rem}ul.svelte-6zytsb>li.svelte-6zytsb.svelte-6zytsb:hover{background-color:#33383E;cursor:pointer}ul.svelte-6zytsb>li:hover button.svelte-6zytsb.svelte-6zytsb{display:flex}ul.svelte-6zytsb>li.svelte-6zytsb>a.svelte-6zytsb{width:80%;display:flex;align-items:center;text-decoration:none;color:#f0f6fc;gap:0.5rem}ul.svelte-6zytsb>li>a:hover img.svelte-6zytsb.svelte-6zytsb{transform:scale(1.05)}ul.svelte-6zytsb>li img.svelte-6zytsb.svelte-6zytsb{height:3.5rem;width:auto;object-fit:cover;aspect-ratio:1/1;border-radius:50%}ul.svelte-6zytsb>li button.svelte-6zytsb.svelte-6zytsb{display:none;width:auto;height:auto;margin-bottom:0;justify-content:center;align-items:center;border:none}ul.svelte-6zytsb>li button.svelte-6zytsb.svelte-6zytsb:hover{opacity:0.9}.friend-request-buttons.svelte-6zytsb.svelte-6zytsb.svelte-6zytsb{display:flex;gap:0.5rem;align-items:center}.friend-profile.svelte-6zytsb.svelte-6zytsb.svelte-6zytsb{position:relative;display:flex;align-items:center;gap:0.5rem}.online.svelte-6zytsb.svelte-6zytsb.svelte-6zytsb{position:absolute;top:0;left:0;background-color:var(--ins-color);width:16px;height:16px;border-radius:50%;box-shadow:0 0 5px black;z-index:10}.error.svelte-6zytsb.svelte-6zytsb.svelte-6zytsb{color:var(--del-color)}@media(max-width: 700px){ul.svelte-6zytsb>li button.svelte-6zytsb.svelte-6zytsb{display:flex}}",
  map: null
};
function sortFriends(friends2) {
  let tmp = friends2;
  return tmp.sort((a, b) => {
    if (a.isConnected && b.isConnected)
      return 0;
    else if (a.isConnected) {
      return -1;
    }
    return 1;
  });
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $friendRequests, $$unsubscribe_friendRequests;
  let $friends, $$unsubscribe_friends;
  $$unsubscribe_friendRequests = subscribe(friendRequests, (value) => $friendRequests = value);
  $$unsubscribe_friends = subscribe(friends, (value) => $friends = value);
  let friendsSorted = [];
  let sendRequestValue = "";
  $$result.css.add(css);
  friendsSorted = sortFriends($friends);
  $$unsubscribe_friendRequests();
  $$unsubscribe_friends();
  return `<section><h3 class="${"svelte-6zytsb"}">Add a friend</h3>
	<div class="${"input-button-container"}" style="${"margin-bottom: -0.5rem;"}"><input type="${"text"}" placeholder="${"Username"}"${add_attribute("value", sendRequestValue, 0)}>
		<button style="${"background-color: var(--ins-color); border:none;"}"><iconify-icon icon="${"fluent-mdl2:add-friend"}" style="${"font-size: 1.5rem"}"></iconify-icon></button></div>
	${``}</section>

<section><div class="${"list-container bg-light-dark"}"><h3 class="${"svelte-6zytsb"}">Friends</h3>
		<ul class="${"svelte-6zytsb"}">${each(friendsSorted, (friend) => {
    return `<li class="${"svelte-6zytsb"}"><a${add_attribute("href", `/profile/${friend.profile.username}`, 0)} class="${"svelte-6zytsb"}"><div class="${"friend-profile svelte-6zytsb"}"><div class="${["svelte-6zytsb", friend.isConnected ? "online" : ""].join(" ").trim()}"></div>
						<img${add_attribute("src", friend.profile.avatar.url, 0)} alt="${"friend"}" class="${"svelte-6zytsb"}">
						${friend.isInGame ? `<iconify-icon icon="${"mdi:sword-fight"}" style="${"font-size: 2rem;"}"></iconify-icon>` : ``}
						<span>${escape(friend.profile.username)}</span>
					</div></a>
				<button style="${"background-color: var(--del-color);"}" class="${"svelte-6zytsb"}"><iconify-icon icon="${"charm:cross"}" style="${"font-size: 1.5rem;"}"></iconify-icon></button>
			</li>`;
  })}</ul></div></section>

<section><div class="${"list-container bg-light-dark"}"><h3 class="${"svelte-6zytsb"}">Friend requests received</h3>
		<ul class="${"svelte-6zytsb"}">${each($friendRequests, (friendRequest) => {
    return `<li class="${"svelte-6zytsb"}"><a${add_attribute("href", `/profile/${friendRequest.creator.username}`, 0)} class="${"svelte-6zytsb"}"><img${add_attribute("src", friendRequest.creator.avatar.url, 0)} alt="${"friend-request-creator"}" class="${"svelte-6zytsb"}">
					<span>${escape(friendRequest.creator.username)}</span></a>
				<div class="${"friend-request-buttons svelte-6zytsb"}"><button style="${"background-color: var(--ins-color);"}" class="${"svelte-6zytsb"}"><iconify-icon icon="${"fluent-mdl2:accept-medium"}" style="${"font-size: 1.5rem;"}"></iconify-icon></button>
					<button style="${"background-color: var(--del-color);"}" class="${"svelte-6zytsb"}"><iconify-icon icon="${"charm:cross"}" style="${"font-size: 1.5rem;"}"></iconify-icon>
					</button></div>
			</li>`;
  })}</ul></div></section>

<section><button>Add fake friend</button>
	<button style="${"margin-bottom: 2rem;"}">Add fake friend request</button>
</section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-1fc289b1.js.map
