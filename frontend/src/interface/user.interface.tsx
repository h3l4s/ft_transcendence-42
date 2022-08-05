interface i_user {
	id?: number;
	access_token?: string;
	name: string;
	profilePicPath?: string;
	xp?: number;
	elo?: number;
	win?: number;
	lose?: number;
}

export default i_user;
