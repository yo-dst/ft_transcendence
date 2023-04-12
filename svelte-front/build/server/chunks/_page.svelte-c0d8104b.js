import { c as create_ssr_component, b as subscribe, v as validate_component, e as escape, d as add_attribute } from './index2-63bef90b.js';
import { p as page } from './stores-095f0b18.js';
import { io } from 'socket.io-client';
import { e as eventsSocket } from './events-socket-e5c603aa.js';
import { u as user } from './user-91f221f3.js';
import './index-63b88ed9.js';

const PUBLIC_API_HOST = "localhost";
const PUBLIC_API_PORT = "3000";
const apiUrl = `http://${PUBLIC_API_HOST}:${PUBLIC_API_PORT}`;
class gameInfo {
  constructor(width, heigth, gameMode) {
    this.gameMode = gameMode;
    this.canvasWidth = 1100;
    this.canvasHeight = 500;
    this.width = 1100;
    this.height = 500;
    this.border = 5;
    this.score = { p1: 0, p2: 0 };
  }
  drawMap(context) {
    context.strokeStyle = "hsl(201, 100%, 96%)";
    context.lineWidth = this.border * 2;
    context.fillStyle = "#b6b6f2";
    context.fillRect(0, 0, this.width, this.height);
    context.strokeRect(0, 0, this.width, this.height);
  }
  drawNet(context) {
    context.lineWidth = this.border;
    context.beginPath();
    context.moveTo(this.width / 2, 0);
    context.lineTo(this.width / 2, this.height);
    context.closePath();
    context.stroke();
  }
}
function waitFlip() {
  return new Promise((resolve) => {
    if (window.innerHeight > window.innerWidth) {
      setTimeout(function() {
        resolve(waitFlip());
      }, 500);
    } else {
      resolve(false);
    }
  });
}
const css$4 = {
  code: "div.svelte-1k01j3x{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);z-index:2;font-size:4rem;opacity:70%;color:rgb(79, 79, 79)}",
  map: null
};
const Timer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { socket } = $$props;
  let showTimer = false;
  let timeLeft = 6;
  socket.on("startTimer", () => {
    showTimer = true;
  });
  socket.on("decrTimer", (counter) => {
    timeLeft = counter;
  });
  if ($$props.socket === void 0 && $$bindings.socket && socket !== void 0)
    $$bindings.socket(socket);
  $$result.css.add(css$4);
  return `${timeLeft > 0 && showTimer ? `<div class="${"svelte-1k01j3x"}">${escape(timeLeft > 1 ? timeLeft - 1 : "GO!")}</div>` : ``}`;
});
const css$3 = {
  code: "body.svelte-1e98n6j{position:absolute;z-index:2;display:flex;flex-direction:column;justify-content:center;align-items:center;height:100vh;background-color:black}h1.svelte-1e98n6j{text-align:center}iconify-icon.svelte-1e98n6j{font-size:100px}",
  map: null
};
const TurnPhone = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$3);
  return `<body class="${"svelte-1e98n6j"}"><h1 class="${"svelte-1e98n6j"}">Turn the phone</h1>
	<iconify-icon icon="${"mdi:phone-rotate-landscape"}" class="${"svelte-1e98n6j"}"></iconify-icon>
</body>`;
});
const css$2 = {
  code: ".post-game-lobby-page.svelte-1k7zz8v{width:100vw;height:100vh;display:flex;justify-content:center;align-items:center}.container.svelte-1k7zz8v{padding:1rem;background-color:#161b22;width:500px;max-width:90vw;display:flex;flex-direction:column;align-items:center;gap:2rem;border-radius:5px}h2.svelte-1k7zz8v{margin-bottom:0}.players-wrapper.svelte-1k7zz8v{display:flex;align-items:center;gap:1rem;margin-bottom:1rem}.buttons-wrapper.svelte-1k7zz8v{width:70%}img.svelte-1k7zz8v{width:92px;height:92px;object-fit:cover;aspect-ratio:1/1;border-radius:50%}.color-win.svelte-1k7zz8v{color:var(--ins-color)}.color-lose.svelte-1k7zz8v{color:var(--del-color)}",
  map: null
};
let userScore = 10;
let opponentScore = 3;
const PostGameLobby = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userProfile = {
    username: "gnogno",
    avatar: { url: "https://picsum.photos/600" },
    wins: 1,
    losses: 1
  };
  let opponentProfile = {
    username: "gnagna",
    avatar: { url: "https://picsum.photos/600" },
    wins: 1,
    losses: 1
  };
  $$result.css.add(css$2);
  return `<div class="${"post-game-lobby-page svelte-1k7zz8v"}"><div class="${"container svelte-1k7zz8v"}"><h2 class="${"svelte-1k7zz8v"}">${`You&#39;re such a loser...`}</h2>
		<div class="${"players-wrapper svelte-1k7zz8v"}"><img${add_attribute("src", userProfile.avatar.url, 0)} alt="${"avatar"}" class="${"svelte-1k7zz8v"}">
			<span class="${"color-win svelte-1k7zz8v"}">${escape(userScore)}</span>
			<span>-</span>
			<span class="${"color-lose svelte-1k7zz8v"}">${escape(opponentScore)}</span>
			<img${add_attribute("src", opponentProfile.avatar.url, 0)} alt="${"avatar"}" class="${"svelte-1k7zz8v"}"></div>
		<div class="${"buttons-wrapper svelte-1k7zz8v"}"><button>Search new game</button>
			<button>Ask revanche</button>
			<button class="${"contrast outline"}" style="${"margin-bottom: 2rem;"}">Go back home</button>
			${`<button class="${"contrast"}">Accept revanche</button>`}</div></div>
</div>`;
});
const css$1 = {
  code: "div.svelte-laehf8{position:absolute;top:30%;left:50%;transform:translate(-50%, -50%);z-index:2;text-align:center;font-size:1.5rem;opacity:70%;color:rgb(79, 79, 79)}",
  map: null
};
const DecoTimer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { socket } = $$props;
  let showTimer = false;
  let timeLeft = 5;
  socket.on("decoTimer", () => {
    showTimer = true;
    let id = setInterval(
      () => {
        timeLeft -= 1;
        if (timeLeft == 0)
          clearInterval(id);
      },
      1e3
    );
  });
  if ($$props.socket === void 0 && $$bindings.socket && socket !== void 0)
    $$bindings.socket(socket);
  $$result.css.add(css$1);
  return `${timeLeft > 0 && showTimer ? `<div class="${"svelte-laehf8"}">A player disconnected, game end in : ${escape(timeLeft)}</div>` : ``}`;
});
const css = {
  code: "canvas.svelte-11ocpqo{position:absolute;z-index:0}strong.svelte-11ocpqo{padding:5vw;z-index:5;font-size:3rem;color:hsl(201, 100%, 96%)}.score.svelte-11ocpqo{display:flex;position:absolute;z-index:1;top:50%;left:50%;transform:translate(-50%, -50%)}",
  map: null
};
const Pong = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $eventsSocket, $$unsubscribe_eventsSocket;
  $$unsubscribe_eventsSocket = subscribe(eventsSocket, (value) => $eventsSocket = value);
  let { gameMode } = $$props;
  let { socket } = $$props;
  let isPlaying = true;
  let ball;
  let paddle1;
  let paddle2;
  let canvas;
  let game = new gameInfo(window.innerWidth, window.innerHeight, gameMode);
  socket.on("startGame", () => {
  });
  socket.on("resetOpacity", () => {
  });
  socket.on("deco", () => {
    $eventsSocket.emit("leave-game");
    isPlaying = false;
  });
  socket.on("playerMove", (newDir) => {
    paddle1.dir = newDir[0];
    paddle2.dir = newDir[1];
  });
  socket.on("endGame", () => {
    $eventsSocket.emit("leave-game");
    socket.emit("destroyGame");
    isPlaying = false;
  });
  socket.on("updateBall", (newBallPos) => {
    ball.x = newBallPos[0];
    ball.y = newBallPos[1];
  });
  socket.on("updateScore", (newScore) => {
    game.score.p1 = newScore[0];
    game.score.p2 = newScore[1];
  });
  socket.on("Down", (paddles) => {
    paddle1.x = paddles[0].x;
    paddle1.y = paddles[0].y;
    paddle1.dir = paddles[0].dir;
    paddle2.x = paddles[1].x;
    paddle2.y = paddles[1].y;
    paddle2.dir = paddles[1].dir;
  });
  if ($$props.gameMode === void 0 && $$bindings.gameMode && gameMode !== void 0)
    $$bindings.gameMode(gameMode);
  if ($$props.socket === void 0 && $$bindings.socket && socket !== void 0)
    $$bindings.socket(socket);
  $$result.css.add(css);
  $$unsubscribe_eventsSocket();
  return `
${isPlaying ? `<main>${validate_component(Timer, "Timer").$$render($$result, { socket }, {}, {})}
		${validate_component(DecoTimer, "DecoTimer").$$render($$result, { socket }, {}, {})}
		<div class="${"score svelte-11ocpqo"}"><strong class="${"svelte-11ocpqo"}">${escape(game.score.p1)}</strong>
			<strong class="${"svelte-11ocpqo"}">${escape(game.score.p2)}</strong></div>
		<canvas${add_attribute("width", game.canvasWidth, 0)}${add_attribute("height", game.canvasHeight, 0)} id="${"pong"}" class="${"svelte-11ocpqo"}"${add_attribute("this", canvas, 0)}></canvas></main>` : `${validate_component(PostGameLobby, "PostGameLobby").$$render($$result, {}, {}, {})}`}

${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $eventsSocket, $$unsubscribe_eventsSocket;
  let $user, $$unsubscribe_user;
  let $page, $$unsubscribe_page;
  $$unsubscribe_eventsSocket = subscribe(eventsSocket, (value) => $eventsSocket = value);
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let turnPhone = true;
  let id = $page.params.id;
  let roomExist = false;
  let gameMode = 0;
  let socket = io(`${apiUrl}/game`);
  let isMobile = false;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    isMobile = true;
  }
  socket.emit("checkId", id, $user?.id);
  socket.on("found", (gamemode) => {
    roomExist = true;
    gameMode = gamemode;
    $eventsSocket.emit("join-game");
  });
  waitFlip().then((newTurnPhone) => {
    turnPhone = newTurnPhone;
  });
  $$unsubscribe_eventsSocket();
  $$unsubscribe_user();
  $$unsubscribe_page();
  return `${roomExist && (!turnPhone || !isMobile) ? `${validate_component(Pong, "Pong").$$render($$result, { gameMode, socket }, {}, {})}` : `${turnPhone && isMobile ? `${validate_component(TurnPhone, "TurnPhone").$$render($$result, {}, {}, {})}` : `RoomId not found

	<button>Go back home</button>`}`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c0d8104b.js.map
