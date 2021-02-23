import * as React from "react"
import socketIOClient from "socket.io-client"

const ENDPOINT = "http://localhost:3456"

const useClientSocket = token => {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isActivated, setIsActivated] = React.useState(false)
  const [tab, setTab] = React.useState(0)
  const socketRef = React.useRef()

  const userToken = (time = 0) => ({
    token,
    tabIndex: tab,
    isPlaying: isPlaying,
    time,
  })

  React.useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT, {
      forceNew: true,
      withCredentials: true,
      autoConnect: true,
    })

    socketRef.current.on("gala:play", state => {
      console.log(`Recieved orders to ${state ? "PLAY" : "STOP"}`)
      setIsPlaying(state)
    })

    socketRef.current.on("gala:tab", tab => {
      setTab(tab)
    })

    socketRef.current.on("gala:activate-client", state => {
      // this one might be better through the DB
    })

    sendToken()

    return () => {
      socketRef.current.disconnect()
    }
  }, [token])

  const sendToken = time => {
    socketRef.current.emit("gala:token", userToken(time))
  }

  return { isPlaying, setIsPlaying, sendToken, tab, setTab }
}

export default useClientSocket
