import {io} from 'socket.io-client';

const socket = io('ws://localhost:8080/couriers');

socket.on('close', reason => {
  console.log('socketManager closes. Reason:', reason);
  socket.connect();
});

socket.on('reconnect_error', () => {
  socket.connect();
});

socket.on('error', () => {
  socket.connect();
});

socket.on('reconnect', () => {
  console.log('Reconnect attempt');
});

export default socket;
