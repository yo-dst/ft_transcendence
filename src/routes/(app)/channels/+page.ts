import type { PageLoad } from './$types';
 
export const load = (({ params }) => {
	return {
		channels: [
			{
				name: "channel1",
				capacity: "34",
				owner: "owner1",
				users: 21,
				public: true
			},
			{
				name: "channel2",
				capacity: "50",
				owner: "owner2",
				users: 9,
				public: true
			},
			{
				name: "channel3",
				capacity: "2",
				owner: "owner3",
				users: 2,
				public: false
			},
			{
				name: "channel4",
				capacity: "12",
				owner: "owner4",
				users: 11,
				public: true
			}
		]
	};

}) satisfies PageLoad;