interface i_user
{
	id?: number;
	access_token?: string;
	username: string;
	profilePicPath?: string;
	xp?: number;
	win?: number;
	lose?: number;
	elo?: number;
}

export default i_user;
