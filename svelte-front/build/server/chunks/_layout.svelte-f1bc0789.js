import { c as create_ssr_component, b as subscribe, v as validate_component, d as add_attribute } from './index2-63bef90b.js';
import 'iconify-icon';
import { u as user } from './user-91f221f3.js';
import { e as eventsSocket } from './events-socket-e5c603aa.js';
import { n as notifications } from './notifications-fd7bb082.js';
import 'socket.io-client';
import { f as friends, a as friendRequests } from './friends-b3bd2ca5.js';
import { c as chatSocket } from './chat-socket-ee959df8.js';
import { c as chatMessages } from './chat-messages-a9bb0885.js';
import { m as matchSocket } from './matchmaking-socket-f70c5197.js';
import './index-63b88ed9.js';

const css = {
  code: ".page.svelte-dzjcrz{width:100vw;height:100vh;display:flex;justify-content:center;align-items:center}.container.svelte-dzjcrz{max-width:500px;display:flex;flex-direction:column}a.svelte-dzjcrz{display:flex;justify-content:center;align-items:center}",
  map: null
};
const LoginPage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let username;
  $$result.css.add(css);
  return `<div class="${"page svelte-dzjcrz"}"><div class="${"container svelte-dzjcrz"}"><a role="${"button"}" class="${"contrast outline svelte-dzjcrz"}" href="${"https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-7470221ce45a9a6950c2b7324e6e5a9a069460af572ce5daa2a0fb547a3d5fda&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth%2Flogin&response_type=code"}"><iconify-icon icon="${"material-symbols:login"}"></iconify-icon>
			Log In
		</a>
		
		<input style="${"margin-top: 2rem;"}"${add_attribute("value", username, 0)}>
		<button>Login with username</button>
	
		<button>Create fake user</button></div>
	
</div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $friends, $$unsubscribe_friends;
  let $$unsubscribe_eventsSocket;
  let $$unsubscribe_notifications;
  let $$unsubscribe_friendRequests;
  let $$unsubscribe_chatMessages;
  let $$unsubscribe_chatSocket;
  let $$unsubscribe_matchSocket;
  let $user, $$unsubscribe_user;
  $$unsubscribe_friends = subscribe(friends, (value) => $friends = value);
  $$unsubscribe_eventsSocket = subscribe(eventsSocket, (value) => value);
  $$unsubscribe_notifications = subscribe(notifications, (value) => value);
  $$unsubscribe_friendRequests = subscribe(friendRequests, (value) => value);
  $$unsubscribe_chatMessages = subscribe(chatMessages, (value) => value);
  $$unsubscribe_chatSocket = subscribe(chatSocket, (value) => value);
  $$unsubscribe_matchSocket = subscribe(matchSocket, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  {
    console.log("user connected", $user);
  }
  {
    console.log("friends", $friends);
  }
  $$unsubscribe_friends();
  $$unsubscribe_eventsSocket();
  $$unsubscribe_notifications();
  $$unsubscribe_friendRequests();
  $$unsubscribe_chatMessages();
  $$unsubscribe_chatSocket();
  $$unsubscribe_matchSocket();
  $$unsubscribe_user();
  return `${$user ? `${slots.default ? slots.default({}) : ``}` : `${validate_component(LoginPage, "LoginPage").$$render($$result, {}, {}, {})}`}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-f1bc0789.js.map
