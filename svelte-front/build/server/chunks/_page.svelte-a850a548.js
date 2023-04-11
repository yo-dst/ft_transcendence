import { c as create_ssr_component, b as subscribe, f as each, e as escape } from './index2-63bef90b.js';
import { u as user } from './user-91f221f3.js';
import { c as chatSocket } from './chat-socket-ee959df8.js';
import './index-63b88ed9.js';

const css = {
  code: "h3.svelte-1d4p513.svelte-1d4p513{margin-bottom:0}ul.svelte-1d4p513.svelte-1d4p513{padding:0;background-color:#090D10;padding:0.5rem 1rem 0.5rem 0.5rem;border-radius:0 0 5px 5px}ul.svelte-1d4p513>li.svelte-1d4p513{background-color:var(--background-color);list-style-type:none;padding:0.5rem 1rem;display:flex;justify-content:space-between;align-items:center}ul.svelte-1d4p513>li button.svelte-1d4p513{width:auto;height:auto;padding:0.3rem;display:flex;justify-content:center;align-items:center;margin-bottom:0}iconify-icon.svelte-1d4p513.svelte-1d4p513{font-size:1.3rem}.channel-right.svelte-1d4p513.svelte-1d4p513{display:flex;align-items:center;gap:1rem}.channel-left.svelte-1d4p513.svelte-1d4p513{display:flex;align-items:center}.users.svelte-1d4p513.svelte-1d4p513{display:flex;justify-content:space-between;align-items:center;width:5.5rem}.channel-name.svelte-1d4p513.svelte-1d4p513{margin-left:1.5rem;display:flex;flex-direction:column}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_chatSocket;
  let $user, $$unsubscribe_user;
  $$unsubscribe_chatSocket = subscribe(chatSocket, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  let rooms = [];
  let joinedRooms = [];
  function getJoinedRooms(rooms2) {
    return rooms2.filter((room) => {
      if ($user.id === room.owner || room.admins.indexOf($user.id) !== -1 || room.member.indexOf($user.id) !== -1) {
        return true;
      }
      return false;
    });
  }
  function roomIsJoined(room) {
    for (let i = 0; i < joinedRooms.length; i++) {
      if (joinedRooms[i].id === room.id) {
        return true;
      }
    }
    return false;
  }
  $$result.css.add(css);
  joinedRooms = getJoinedRooms(rooms);
  $$unsubscribe_chatSocket();
  $$unsubscribe_user();
  return `<section><a href="${"/channels/create"}" role="${"button"}" style="${"width: 100%;"}">Create your channel</a></section>

<section><h3 class="${"svelte-1d4p513"}">Joined channels</h3>
	<ul class="${"svelte-1d4p513"}">${each(joinedRooms, (room) => {
    return `<li class="${"svelte-1d4p513"}"><div class="${"channel-left svelte-1d4p513"}"><div class="${"users svelte-1d4p513"}"><span>${escape(room.member.length + room.admins.length + 1)} / ${escape(room.capacity)}</span>
						<iconify-icon icon="${"fa-solid:user-friends"}" class="${"svelte-1d4p513"}"></iconify-icon></div>
					<div class="${"channel-name svelte-1d4p513"}">${escape(room.name)}
						<small><i>${escape(room.ownerProfile.username)}</i></small>
					</div></div>
				<div class="${"channel-right svelte-1d4p513"}">${room.member.length + room.admins.length + 1 >= room.capacity ? `<p>room filled</p>` : `<button class="${"secondary svelte-1d4p513"}"><iconify-icon icon="${"material-symbols:open-in-browser"}" class="${"svelte-1d4p513"}"></iconify-icon>
						</button>`}</div>
			</li>`;
  })}</ul></section>

<section><h3 class="${"svelte-1d4p513"}">Channels</h3>
	<ul class="${"svelte-1d4p513"}">${each(rooms, (room) => {
    return `${!roomIsJoined(room) ? `<li class="${"svelte-1d4p513"}"><div class="${"channel-left svelte-1d4p513"}"><div class="${"users svelte-1d4p513"}"><span>${escape(room.member.length + room.admins.length + 1)} / ${escape(room.capacity)}</span>
							<iconify-icon icon="${"fa-solid:user-friends"}" class="${"svelte-1d4p513"}"></iconify-icon></div>
						<div class="${"channel-name svelte-1d4p513"}">${escape(room.name)}
							<small><i>${escape(room.ownerProfile.username)}</i></small>
						</div></div>
					<div class="${"channel-right svelte-1d4p513"}">${room.member.length + room.admins.length + 1 >= room.capacity ? `<p>room filled</p>` : `${room.isProtected ? `<iconify-icon icon="${"material-symbols:lock"}" style="${"font-size: 1.5rem;"}" class="${"svelte-1d4p513"}"></iconify-icon>
							<button class="${"secondary svelte-1d4p513"}"><iconify-icon icon="${"material-symbols:open-in-browser"}" class="${"svelte-1d4p513"}"></iconify-icon>
							</button>` : `<button class="${"secondary svelte-1d4p513"}"><iconify-icon icon="${"material-symbols:open-in-browser"}" class="${"svelte-1d4p513"}"></iconify-icon>
							</button>`}`}</div>
					${``}
				</li>` : ``}`;
  })}</ul>
</section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-a850a548.js.map
