import * as React from "react"
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:3456"

const useAdminSocket = token => {
  const [clients, setClients] = React.useState([])
  const socketRef = React.useRef()

  React.useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT, {
      forceNew: true,
      withCredentials: true,
      autoConnect: true,
    })

    socketRef.current.on("gala:clients", message => {
      setClients(message)
      // messageHandler(message, emailsRef.current, setEmails)
    })
    sendToken()
    return () => {
      socketRef.current.disconnect()
    }
  }, [token])

  const sendToken = () => {
    socketRef.current.emit("gala:backend", token)
  }

  const sendToggleForcePlay = (state = false) => {
    // console.log(`Forcing to ${state ? "PLAY" : "STOP"}`)
    // socketRef.current.emit("gala:forcePlay", state)
  }

  const sendToggleActivate = (state = false) => {
    socketRef.current.emit("gala:activate", state)
  }

  const sendUserTabs = tab => {
    socketRef.current.emit("gala:setTab", tab)
  }

  return {
    clients,
    sendToken,
    sendToggleForcePlay,
    sendToggleActivate,
    sendUserTabs,
  }
}

export default useAdminSocket
