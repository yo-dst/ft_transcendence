export interface Match {
	id: number;
	scoreWinner: number;
	scoreLoser: number;
	createdAt: Date;
	winner: {
		id: number;
		email: string;
		twoFactorAuthenticationSecret: null | string;
		isTwoFactorAuthenticationEnabled: boolean;
		profile: {
			id: number;
			username: string;
			avatar: {
				id: number;
				url: string;
			};
		};
	};
	loser: {
		id: number;
		email: string;
		twoFactorAuthenticationSecret: null | string;
		isTwoFactorAuthenticationEnabled: boolean;
		profile: {
			id: number;
			username: string;
			avatar: {
				id: number;
				url: string;
			};
		};
	};
}
