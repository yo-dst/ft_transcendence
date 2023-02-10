import type { PageLoad } from './$types';
 
export const load = (() => {
  return {
    friends: [
		{
			id: 1,
			username: "friend1",
			online: true,
			inGame: false
		},
		{
			id: 2,
			username: "friend2",
			online: true,
			inGame: true
		},
		{
			id: 3,
			username: "friend3",
			online: false,
			inGame: false
		},
		{
			id: 4,
			username: "friend4",
			online: true,
			inGame: false
		},
		{
			id: 5,
			username: "friend5",
			online: false,
			inGame: false
		},
		{
			id: 6,
			username: "friend6",
			online: true,
			inGame: true
		}
	]
  };
}) satisfies PageLoad;