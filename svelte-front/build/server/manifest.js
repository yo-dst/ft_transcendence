const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["default_pp.jpeg","favicon.png","menu.svg","pong-icon.svg","xmark.svg"]),
	mimeTypes: {".jpeg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.2b2b9c5f.js","imports":["_app/immutable/entry/start.2b2b9c5f.js","_app/immutable/chunks/index.85b3f724.js","_app/immutable/chunks/singletons.5212e3d2.js","_app/immutable/chunks/index.a5450dba.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.704bc471.js","imports":["_app/immutable/entry/app.704bc471.js","_app/immutable/chunks/index.85b3f724.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./chunks/0-213f7baf.js'),
			() => import('./chunks/1-226a22d3.js'),
			() => import('./chunks/2-7fead045.js'),
			() => import('./chunks/3-f1aea1d1.js'),
			() => import('./chunks/4-a5e2cd91.js'),
			() => import('./chunks/5-d62c9595.js'),
			() => import('./chunks/6-f71067e5.js'),
			() => import('./chunks/7-4a08b95b.js'),
			() => import('./chunks/8-1e589673.js'),
			() => import('./chunks/9-c5fda764.js'),
			() => import('./chunks/10-442473a3.js'),
			() => import('./chunks/11-27ffbbfc.js'),
			() => import('./chunks/12-b2dd028e.js'),
			() => import('./chunks/13-082e36ff.js'),
			() => import('./chunks/14-8ceb41c0.js'),
			() => import('./chunks/15-d38f74d7.js'),
			() => import('./chunks/16-ca2b040e.js')
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

const prerendered = new Set([]);

export { manifest, prerendered };
//# sourceMappingURL=manifest.js.map
