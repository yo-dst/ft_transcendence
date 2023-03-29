<script>
	import { paddle, gameInfo, ball as Ball } from "./pong";
	import { onMount } from "svelte";
	import Timer from "$lib/components/timer.svelte";
	import TurnPhone from "$lib/components/turnPhone.svelte";
	import PostGameLobby from "$lib/components/PostGameLobby.svelte";

	/**
	 * @type {number}
	 */
	export let gameMode;
	/**
	 * @type {{ emit: (arg0: string, arg1: number | Ball | undefined, arg2: string | number | undefined) => void; on: (arg0: string, arg1: { (): void; (): void; (newVel: any): void; (newDir: any): void; (newScore: any): void; (newBall: any): void; (nb: any): void; }) => void; disconnect: () => void; }}
	 */
	export let socket;

	let isPlaying = true;
	let isMobile = false;
	let turnPhone = false;
	let lastY = 0;
	if (
		/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
			navigator.userAgent
		)
	) {
		isMobile = true;
	}

	let DIRECTION = {
		IDLE: 0,
		UP: 1,
		DOWN: 2,
	};
	let timer = 0;

	/**
	 * @type {Ball}
	 */
	let ball;
	/**
	 * @type {paddle}
	 */
	let paddle1;
	/**
	 * @type {paddle}
	 */
	let paddle2;

	/**
	 * @type {CanvasRenderingContext2D | null}
	 */
	let context;
	/**
	 * @type {HTMLCanvasElement}
	 */
	let canvas;
	let game = new gameInfo(window.innerWidth, window.innerHeight, gameMode);

	let rand = { x: 1, y: 1 };
	onMount(() => {
		paddle1 = new paddle(game, true);
		paddle2 = new paddle(game, false);
		ball = new Ball(game, rand);
		context = canvas.getContext("2d");
		if (
			game.width > window.innerWidth ||
			game.height > window.innerHeight
		) {
			canvas.style.cssText =
				"position: absolute;top: 50%;left: 50%;transform: scale(1) translate(-50%, -50%);width: 100%;height: 100%;transform-origin: top left;color: #b6b6f2;";
		} else
			canvas.style.cssText =
				"position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);color: #b6b6f2;";
		socket.emit("ready");
		requestAnimationFrame(draw);
	});

	socket.on("startGame", () => {
		timer = 0;
	});

	socket.on("playerMove", (newDir) => {
		paddle1.dir = newDir[0];
		paddle2.dir = newDir[1];
	});

	socket.on("endGame", () => {
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

	socket.on("Down", (/** @type {any} */ paddles) => {
		paddle1.x = paddles[0].x;
		paddle1.y = paddles[0].y;
		paddle1.dir = paddles[0].dir;
		paddle2.x = paddles[1].x;
		paddle2.y = paddles[1].y;
		paddle2.dir = paddles[1].dir;
	});

	const draw = () => {
		if (window.innerHeight > window.innerWidth) turnPhone = true;
		else turnPhone = false;
		timer++;

		//draw map
		game.drawMap(context);

		//draw net
		game.drawNet(context);

		//check playerMouvement
		if (paddle1.dir == DIRECTION.UP && paddle1.y > 0) {
			paddle1.y -= paddle1.speed;
		} else if (
			paddle1.dir == DIRECTION.DOWN &&
			paddle1.y + paddle1.player_height < game.height
		) {
			paddle1.y += paddle1.speed;
		}
		if (paddle2.dir == DIRECTION.UP && paddle2.y > 0) {
			paddle2.y -= paddle2.speed;
		} else if (
			paddle2.dir == DIRECTION.DOWN &&
			paddle2.y + paddle2.player_height < game.height
		) {
			paddle2.y += paddle2.speed;
		}
		//draw the paddles
		paddle1.draw(context);
		paddle2.draw(context);

		//make the ball transparent over time if gameMode is ghost
		if (gameMode === 2) {
			context.globalAlpha = 1 - Math.min(1, timer / 150);
		}
		//draw elements
		ball.draw(context);
		if (lastY != ball.x_vel) {
			timer = 0;
			lastY = ball.x_vel;
		}
		context.globalAlpha = 1;
		requestAnimationFrame(draw);
	};

	function handleKeysDown(event) {
		if (event.key == "w") {
			socket.emit("playerUp", paddle1.dir, paddle2.dir);
		} else if (event.key == "s") {
			socket.emit("playerDown", paddle1.dir, paddle2.dir);
		}
	}

	function handleKeysUp() {
		socket.emit("keyReleased");
	}
</script>

<svelte:window on:keydown={handleKeysDown} on:keyup={handleKeysUp} />
{#if isPlaying}
	<main>
		<Timer {socket} />
		<div class="score">
			<strong>
				{game.score.p1}
			</strong>
			<strong>
				{game.score.p2}
			</strong>
		</div>
		<!-- {#if isMobile}
			<div class="buttons">
				<button class="mobile">hello</button>
				<button class="mobile">hoy</button>
			</div>
		{/if} -->
		<canvas
			bind:this={canvas}
			width={game.canvasWidth}
			height={game.canvasHeight}
			id="pong"
		/>
	</main>
{:else}
	<PostGameLobby />
{/if}

{#if turnPhone}
	<TurnPhone />
{/if}

<style>
	canvas {
		position: absolute;
		z-index: 0;
	}
	strong {
		padding: 5vw;
		z-index: 5;
		font-size: 3rem;
		color: hsl(201, 100%, 96%);
	}
	.score {
		display: flex;
		position: absolute;
		z-index: 1;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	button {
		z-index: 1;
	}

	.buttons {
		z-index: 1;
		display: flex;
		justify-content: space-between;
		padding-top: 85vh;
		padding-left: 10vw;
		padding-right: 10vw;
	}
</style>
