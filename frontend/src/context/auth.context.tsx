import { createContext, Dispatch, SetStateAction } from 'react'

export const AuthContext = createContext<{
	username: string | null;
	setUsername: Dispatch<SetStateAction<string | null>>;
}>({
	username: null,
	setUsername: () => { }
});
