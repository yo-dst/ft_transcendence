export type UserType = undefined | {
	id: number;
	email: string;
	username: string;
	twoFactorAuthenticationSecret: string | null;
	isTwoFactorAuthenticationEnabled: boolean;
}
