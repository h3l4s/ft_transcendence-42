interface i_chan
{
	id?: number;
	name?: string;
	usersId?: number[];
	ownerId?: number;
	adminsId?: number;
	type?: 'public' | 'private' | 'protected' | 'direct';
	// do not get nor send hash
	// msg
}

export default i_chan;
