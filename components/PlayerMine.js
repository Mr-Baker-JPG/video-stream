import React from "react"
import absoluteUrl from "next-absolute-url"
import ReactPlayer from "react-player/youtube"

const loadYouTube = callback => {
  const scriptId = "youtubeJS"
  const existingScript = document.getElementById(scriptId)

  if (!existingScript) {
    const script = document.createElement("script")
    script.src = `https://www.youtube.com/iframe_api`

    script.id = scriptId
    document.body.appendChild(script)

    script.onload = () => {
      if (callback) {
        callback()
      }
    }
  }

  if (existingScript && callback) {
    callback()
  }
}

const VIDEO_PLAY = "VIDEO_PLAY"
const VIDEO_PAUSE = "VIDEO_PAUSE"
const VIDEO_MUTE = "VIDEO_MUTE"
const VIDEO_UNMUTE = "VIDEO_UNMUTE"
const VIDEO_UPDATE_AUDIO = "VIDEO_UPDATE_AUDIO"
const VIDEO_UPDATE_POSITION = "VIDEO_UPDATE_POSITION"
const VIDEO_SET_PLAYER = "VIDEO_SET_PLAYER"
const VIDEO_SET_SIZE = "VIDEO_SET_SIZE"
const VIDEO_TOGGLE_PLAY = "VIDEO_TOGGLE_PLAY"

const videoReducer = (state, action) => {
  switch (action.type) {
    case VIDEO_TOGGLE_PLAY:
      if (state.isPlaying) {
        return { ...state, isPlaying: false }
      } else {
        return { ...state, isPlaying: true }
      }
    case VIDEO_PLAY:
      if (state.player) {
        return { ...state, isPlaying: true, position: "78%" }
      }
      return { ...state }
    case VIDEO_PAUSE:
      if (state.player) {
        return { ...state, isPlaying: false }
      }
      return { ...state }
    case VIDEO_MUTE:
      return { ...state, isMuted: true, volume: 0 }
    case VIDEO_UNMUTE:
      return {
        ...state,
        isMuted: false,
        volume: state.player.getVolume(),
      }
    case VIDEO_UPDATE_AUDIO:
      state.player.setVolume(action.payload)
      return {
        ...state,
        isMuted: false,
        volume: action.payload,
      }
    case VIDEO_UPDATE_POSITION:
      return {
        ...state,
        position: state.player.getDuration()
          ? state.player.getCurrentTime() / state.player.getDuration()
          : 0,
      }
    case VIDEO_SET_PLAYER:
      console.log("Setting player")
      return {
        ...state,
        player: action.payload,
      }
    case VIDEO_SET_SIZE:
      return {
        ...state,
        width: action.width,
        height: action.width,
      }
    default:
      return state
  }
}

const Player = ({ videoId }) => {
  const [loaded, setLoaded] = React.useState(false)
  const [player, setPlayer] = React.useState(null)
  const [videoState, videoDispatch] = React.useReducer(videoReducer, {
    volume: 80,
    isMuted: false,
    isPlaying: false,
    position: 0,
    error: null,
    player: null,
    width: 0,
    height: 0,
  })
  const [isPlaying, setIsPlaying] = React.useState(false)
  const playerRef = React.useRef()

  // React.useEffect(() => {
  //   loadYouTube(() => {
  //     setLoaded(true)
  //     window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
  //   })

  //   return () => videoState.player.destroy()
  // }, [videoId])

  React.useEffect(() => {
    videoDispatch({ type: VIDEO_SET_PLAYER, payload: playerRef.current.player })
  }, [])

  React.useEffect(() => {
    console.log(`Player: `, videoState)
  }, [player])

  const toggleVideoPlay = () => {
    console.log("TOGGLE")
    console.log(videoState)
    videoDispatch({ type: VIDEO_TOGGLE_PLAY })
  }

  const playVideo = () => {
    videoDispatch({ type: VIDEO_PLAY })
  }

  const isPaused = () => {
    return player && player.getPlayerState() === 2
  }

  const onReady = e => {
    // e.player.player.player.setSize(
    //   playerRef.current.offsetWidth,
    //   playerRef.current.offsetHeight
    // )
  }

  return (
    <div>
      <div className="relative w-full h-full bg-gray-900">
        <div
          onClick={toggleVideoPlay}
          className="absolute z-50 w-full h-full"
        ></div>
        <div>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            // onPlay={}
            // onPause={}
            ref={playerRef}
            onReady={onReady}
            played={videoState.played}
            playing={videoState.isPlaying}
            width="100%"
            height="100%"
            config={{
              youtube: {
                embedOptions: {},
                playerVars: {
                  controls: 0,
                  disabledkb: 1,
                  autoplay: 0,
                  modestbranding: 1,
                  // origin: "http://localhost:3000",
                  rel: 0,
                },
              },
            }}
          />
          {/* <div id={`player-${videoId}`}></div> */}
        </div>
        <div className="absolute bottom-0 right-0 h-10 p-1 bg-gray-500 md:h-16">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="flex items-center">
          {videoState.isPlaying ? (
            <PauseButton onClick={() => videoDispatch({ type: VIDEO_PAUSE })} />
          ) : (
            <PlayButton onClick={() => videoDispatch({ type: VIDEO_PLAY })} />
          )}
        </div>
        <div className="flex items-center">
          {videoState.volume <= 1 || videoState.isMuted ? (
            <MutedButton
              onClick={() => videoDispatch({ type: VIDEO_UNMUTE })}
            />
          ) : (
            <SoundButton onClick={() => videoDispatch({ type: VIDEO_MUTE })} />
          )}
        </div>

        <div className="flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value={videoState.volume}
            className="audio other"
            onChange={e =>
              videoDispatch({
                type: VIDEO_UPDATE_AUDIO,
                payload: e.target.value,
              })
            }
            id="myRange"
          ></input>
        </div>
        <div className="flex items-center">
          <ExpandButton />
        </div>
        <div>
          {/* {videoState.position} {videoState.player.getDuration()}{" "}
          {videoState.player.getCurrentTime()} */}
        </div>
      </div>
    </div>
  )
}

const PauseButton = ({ onClick }) => (
  <button onClick={onClick}>
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </button>
)

const PlayButton = ({ onClick }) => (
  <button onClick={onClick}>
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  </button>
)

const MutedButton = ({ onClick }) => (
  <button onClick={onClick}>
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  </button>
)

const SoundButton = ({ onClick }) => (
  <button onClick={onClick}>
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
        clipRule="evenodd"
      />
    </svg>
  </button>
)

const ExpandButton = ({ onClick }) => (
  <button onClick={onClick}>
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      ></path>
    </svg>
  </button>
)

export default Player
