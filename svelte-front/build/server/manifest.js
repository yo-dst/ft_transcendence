const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["default_pp.jpeg","favicon.png","menu.svg","pong-icon.svg","xmark.svg"]),
	mimeTypes: {".jpeg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml"},
	_: {
		entry: {"file":"_app/immutable/start-62335535.js","imports":["_app/immutable/start-62335535.js","_app/immutable/chunks/index-5fac9acd.js","_app/immutable/chunks/singletons-846de1f6.js","_app/immutable/chunks/index-07a2c1d0.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./chunks/0-620f755b.js'),
			() => import('./chunks/1-a4822165.js'),
			() => import('./chunks/2-30c4a7a0.js'),
			() => import('./chunks/3-8c6ea56e.js'),
			() => import('./chunks/4-8601f3e5.js'),
			() => import('./chunks/5-15682d41.js'),
			() => import('./chunks/6-85cf3e51.js'),
			() => import('./chunks/7-5c09ea05.js'),
			() => import('./chunks/8-83d474b5.js'),
			() => import('./chunks/9-58d0bed3.js'),
			() => import('./chunks/10-ac5dc9cf.js'),
			() => import('./chunks/11-7bcbb099.js'),
			() => import('./chunks/12-0258768b.js'),
			() => import('./chunks/13-6f0b9de4.js'),
			() => import('./chunks/14-9a89ccaf.js'),
			() => import('./chunks/15-bf7a2c69.js'),
			() => import('./chunks/16-dedcc042.js')
		],
		routes: [
			{
				id: "/(app)",
				pattern: /^\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/2fa/activate",
				pattern: /^\/2fa\/activate\/?$/,
				params: [],
				page: { layouts: [0,4], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/2fa/verify",
				pattern: /^\/2fa\/verify\/?$/,
				params: [],
				page: { layouts: [0,4], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/(app)/channels",
				pattern: /^\/channels\/?$/,
				params: [],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/(app)/channels/create",
				pattern: /^\/channels\/create\/?$/,
				params: [],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/(app)/channels/[id]",
				pattern: /^\/channels\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,3], errors: [1,,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/(app)/friends",
				pattern: /^\/friends\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/game/[id]",
				pattern: /^\/game\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0], errors: [1], leaf: 16 },
				endpoint: null
			},
			{
				id: "/(app)/parameters",
				pattern: /^\/parameters\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/(app)/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/(app)/profile/[username]",
				pattern: /^\/profile\/([^/]+?)\/?$/,
				params: [{"name":"username","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/(app)/users",
				pattern: /^\/users\/?$/,
				params: [],
				page: { layouts: [0,2], errors: [1,,], leaf: 13 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

const prerendered = new Set(["/","/2fa/activate","/2fa/verify","/channels","/channels/create","/friends","/parameters","/profile","/users"]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
