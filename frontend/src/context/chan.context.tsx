import { createContext, Dispatch, SetStateAction } from 'react'

export const ChanContext = createContext<{
	selectedChan: number;
	setSelectedChan: Dispatch<SetStateAction<number>>;
}>({
	selectedChan: 1,
	setSelectedChan: () => { }
});