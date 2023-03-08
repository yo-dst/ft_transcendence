import type { PageLoad } from './$types';
 
export const load = (() => {
  return {
    friends: [
		{
			id: 1,
			username: "friend1",
			online: true,
			inChannel: true,
			inGame: false
		},
		{
			id: 2,
			username: "friend2",
			online: true,
			inChannel: false,
			inGame: true
		},
		{
			id: 3,
			username: "friend3",
			online: false,
			inChannel: false,
			inGame: false
		},
		{
			id: 4,
			username: "friend4",
			online: true,
			inChannel: true,
			inGame: false
		},
		{
			id: 5,
			username: "friend5",
			online: false,
			inChannel: false,
			inGame: false
		},
		{
			id: 6,
			username: "friend6",
			online: true,
			inChannel: false,
			inGame: false
		}
	]
  };
}) satisfies PageLoad;