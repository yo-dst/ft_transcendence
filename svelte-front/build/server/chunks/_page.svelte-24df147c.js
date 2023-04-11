import { c as create_ssr_component, b as subscribe, i as set_store_value, v as validate_component, e as escape, d as add_attribute, f as each } from './index2-63bef90b.js';
import { u as user } from './user-91f221f3.js';
import { p as page } from './stores-095f0b18.js';
import { c as chatSocket } from './chat-socket-ee959df8.js';
import { L as Loading } from './Loading-2712611e.js';
import { c as chatMessages } from './chat-messages-a9bb0885.js';
import './index-63b88ed9.js';

const ModalPasswordChannels = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_chatSocket;
  $$unsubscribe_chatSocket = subscribe(chatSocket, (value) => value);
  let { closeModal } = $$props;
  let { roomId } = $$props;
  let password;
  if ($$props.closeModal === void 0 && $$bindings.closeModal && closeModal !== void 0)
    $$bindings.closeModal(closeModal);
  if ($$props.roomId === void 0 && $$bindings.roomId && roomId !== void 0)
    $$bindings.roomId(roomId);
  $$unsubscribe_chatSocket();
  return `<dialog open><article><h3>Enter password :</h3>
		<input type="${"text"}"${add_attribute("value", password, 0)}>
		${``}
	  <footer><a href="${"/channels"}" role="${"button"}" class="${"secondary"}">Cancel</a>
		<a href="${" "}" role="${"button"}">Confirm</a></footer></article></dialog>`;
});
const css = {
  code: "header.svelte-19bvman.svelte-19bvman{padding:1rem;display:flex;align-items:center;justify-content:space-between;gap:3rem}header.svelte-19bvman h3.svelte-19bvman{margin-bottom:0}header.svelte-19bvman>.svelte-19bvman:first-child{display:flex;align-items:center;gap:0.5rem}header.svelte-19bvman>.svelte-19bvman:last-child{display:flex;align-items:center;justify-content:flex-end;gap:1rem}header.svelte-19bvman iconify-icon.svelte-19bvman:hover{cursor:pointer;transform:scale(1.05)}article.svelte-19bvman.svelte-19bvman{height:80vh;display:flex;flex-direction:column;margin:auto}footer.svelte-19bvman div.svelte-19bvman{display:flex;align-items:center}footer.svelte-19bvman iconify-icon.svelte-19bvman{position:absolute;padding-left:1rem}ul.svelte-19bvman li.svelte-19bvman{list-style:none}.ul-users-list.svelte-19bvman li.svelte-19bvman{display:flex;align-items:center;gap:1rem;cursor:pointer}.ul-users-list.svelte-19bvman li.svelte-19bvman:hover{text-decoration:underline}.ul-users-list.svelte-19bvman li:hover iconify-icon.svelte-19bvman{transform:scale(1.05)}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  let $chatSocket, $$unsubscribe_chatSocket;
  let $chatMessages, $$unsubscribe_chatMessages;
  let $page, $$unsubscribe_page;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_chatSocket = subscribe(chatSocket, (value) => $chatSocket = value);
  $$unsubscribe_chatMessages = subscribe(chatMessages, (value) => $chatMessages = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let input = "";
  let element;
  const channelId = $page.url.href.split("/").pop();
  let roomName;
  let isLoading = true;
  let showPasswordModal = true;
  let connectedUser;
  if (!$chatMessages[channelId])
    set_store_value(chatMessages, $chatMessages[channelId] = [], $chatMessages);
  $chatSocket.emit("verifyUser", channelId, (info) => {
    if (info.isConnected)
      showPasswordModal = false;
    else
      showPasswordModal = true;
    roomName = info.roomName;
    info.isAdmin;
    isLoading = false;
    connectedUser = info.connectedUser;
  });
  $chatSocket.on("updateConnectedUsers", (info) => {
    connectedUser = info;
    connectedUser = connectedUser;
  });
  $$result.css.add(css);
  $$unsubscribe_user();
  $$unsubscribe_chatSocket();
  $$unsubscribe_chatMessages();
  $$unsubscribe_page();
  return `${isLoading ? `${validate_component(Loading, "Loading").$$render($$result, {}, {}, {})}` : `${showPasswordModal ? `${validate_component(ModalPasswordChannels, "ModalPasswordChannels").$$render(
    $$result,
    {
      closeModal: () => showPasswordModal = false,
      roomId: channelId
    },
    {},
    {}
  )}` : `<article class="${"svelte-19bvman"}"><header class="${"svelte-19bvman"}"><div class="${"svelte-19bvman"}">${connectedUser.owner === $user.profile?.username ? `<iconify-icon icon="${"material-symbols:settings-outline"}" style="${"font-size: 1.8rem"}" class="${"svelte-19bvman"}"></iconify-icon>` : ``}
			<h3 class="${"safe-words svelte-19bvman"}">Channel ${escape(roomName)}</h3></div>
		<div class="${"svelte-19bvman"}">${`<iconify-icon icon="${"mdi:users-group"}" style="${"font-size: 2rem"}" class="${"svelte-19bvman"}"></iconify-icon>`}
			<iconify-icon icon="${"pepicons-pop:leave"}" style="${"font-size: 1.8rem"}" class="${"svelte-19bvman"}"></iconify-icon></div></header>

	${`<body style="${"overflow: auto;"}"${add_attribute("this", element, 0)}><ul class="${"svelte-19bvman"}"><li class="${"svelte-19bvman"}"><span style="${"color: #9F2B68"}">System</span> : Welcome to the channel ${escape($user.profile?.username)} !
				</li>
				${each($chatMessages[channelId], (userInfo) => {
    return `<li class="${"svelte-19bvman"}">
							${userInfo.username !== $user.profile?.username ? `<span style="${"color: #FEA347;"}">${escape(userInfo.username)}
								
							</span>` : `<span style="${"color: #FEA347; text-decoration: underline;"}">
								${escape(userInfo.username)}
							</span>`}
						: ${escape(userInfo.message)}
					</li>`;
  })}</ul></body>
		<footer style="${"margin-top:auto"}" class="${"svelte-19bvman"}"><div class="${"svelte-19bvman"}"><input type="${"text"}" style="${"margin: 0;margin-right: 1rem;text-indent: 2rem;"}"${add_attribute("value", input, 0)}>
				<iconify-icon icon="${"ic:baseline-send"}" style="${"font-size: 1.5rem;"}" class="${"svelte-19bvman"}"></iconify-icon></div></footer>`}</article>`}`}

${``}

${``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-24df147c.js.map
