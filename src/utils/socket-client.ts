import { Socket, io } from 'socket.io-client';

class SocketManager {
  socket: Socket;

  startConnection(token: string) {
    console.log(this.socket, 'into socket...');
    if (!this.socket)
      this.socket = io(`${process.env.BACK_URL}`, this.getOptions(token));

    return this.socket;
  }

  getSocket(): Socket {
    return this.socket;
  }

  cleanSocket() {
    this.socket = null;
  }

  private getOptions(token: string): Object {
    return {
      "force new connection": true,
      "reconnectionAttempts": "Infinity",
      "timeout": 10000,
      "transports": ["websocket"],
      "auth": {
        "token": token
      }
    }
  }
}

const socketTool = new SocketManager();

export default socketTool;