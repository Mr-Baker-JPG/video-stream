import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:3456"

const socket = socketIOClient(ENDPOINT, {
  forceNew: true,
  withCredentials: true,
  autoConnect: true,
})

export default socket
