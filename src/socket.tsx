import { Socket, io } from 'socket.io-client';

const socket: Socket = io('http://localhost:3000'); // Connect to the Socket.IO server

export default socket;