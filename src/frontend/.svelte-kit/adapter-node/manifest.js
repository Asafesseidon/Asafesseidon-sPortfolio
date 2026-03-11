export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([]),
	mimeTypes: {},
	_: {
		client: {start:"_app/immutable/entry/start.Bx9EZuGk.js",app:"_app/immutable/entry/app.ZJDPUXA2.js",imports:["_app/immutable/entry/start.Bx9EZuGk.js","_app/immutable/chunks/DSvYHcVI.js","_app/immutable/chunks/DqE8ATm7.js","_app/immutable/chunks/i-echKGZ.js","_app/immutable/entry/app.ZJDPUXA2.js","_app/immutable/chunks/DqE8ATm7.js","_app/immutable/chunks/BCfBrvPz.js","_app/immutable/chunks/DRLDrDpR.js","_app/immutable/chunks/i-echKGZ.js","_app/immutable/chunks/2au75-c6.js","_app/immutable/chunks/FrPAkpiu.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js')),
			__memo(() => import('./nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export const prerendered = new Set([]);

export const base = "";