import { createContext } from 'react'
import { io, Socket } from 'socket.io-client';

export const StatusContext = createContext<{
	socket: Socket;
}>({
	socket: io("http://" + window.location.hostname + ":3000/user")
});
