import type { PageLoad } from './$types';
 
export const load = (() => {
  return {
    matchHistory: [
		{
			id: 1,
			opponent: "nferre",
			result: {
				opponnentPoints: 6,
				myPoints: 7
			},
			date: new Date()
		},
		{
			id: 2,
			opponent: "mlecherb",
			result: {
				opponnentPoints: 5,
				myPoints: 8
			},
			date: new Date()
		},
		{
			id: 3,
			opponent: "nullos",
			result: {
				opponnentPoints: 1,
				myPoints: 9
			},
			date: new Date()
		},
		{
			id: 4,
			opponent: "ydanset",
			result: {
				opponnentPoints: 14,
				myPoints: 6
			},
			date: new Date()
		},
		{
			id: 5,
			opponent: "prout",
			result: {
				opponnentPoints: 4,
				myPoints: 0
			},
			date: new Date()
		},
		{
			id: 6,
			opponent: "icanfeelit",
			result: {
				opponnentPoints: 2,
				myPoints: 2
			},
			date: new Date()
		},
		{
			id: 7,
			opponent: "nferre",
			result: {
				opponnentPoints: 6,
				myPoints: 7
			},
			date: new Date()
		},
		{
			id: 8,
			opponent: "mlecherb",
			result: {
				opponnentPoints: 5,
				myPoints: 8
			},
			date: new Date()
		},
		{
			id: 9,
			opponent: "nullos",
			result: {
				opponnentPoints: 1,
				myPoints: 9
			},
			date: new Date()
		},
		{
			id: 10,
			opponent: "ydanset",
			result: {
				opponnentPoints: 14,
				myPoints: 6
			},
			date: new Date()
		},
		{
			id: 11,
			opponent: "prout",
			result: {
				opponnentPoints: 4,
				myPoints: 0
			},
			date: new Date()
		},
		{
			id: 12,
			opponent: "icanfeelit",
			result: {
				opponnentPoints: 2,
				myPoints: 2
			},
			date: new Date()
		}
	]
  };
}) satisfies PageLoad;