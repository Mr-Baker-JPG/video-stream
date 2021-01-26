import React from "react"
import YouTubePlayer from "youtube-player"

const VIDEO_PLAY = "VIDEO_PLAY"
const VIDEO_PAUSE = "VIDEO_PAUSE"
const VIDEO_MUTE = "VIDEO_MUTE"
const VIDEO_UNMUTE = "VIDEO_UNMUTE"
const VIDEO_UPDATE_AUDIO = "VIDEO_UPDATE_AUDIO"
const VIDEO_UPDATE_POSITION = "VIDEO_UPDATE_POSITION"
const VIDEO_SET_PLAYER = "VIDEO_SET_PLAYER"
const VIDEO_SET_SIZE = "VIDEO_SET_SIZE"

const videoReducer = async (state, action) => {
  switch (action.type) {
    case VIDEO_PLAY:
      if (state.player) {
        console.log("PLAYING", state.player)
        await state.player.playVideo()
        console.log(`STATE: ${state.player.getPlayerState()}`)
        return { ...state, isPlaying: true, position: "78%" }
      }
      return { ...state }
    case VIDEO_PAUSE:
      state.player.pauseVideo()
      return { ...state, isPlaying: false }
    case VIDEO_MUTE:
      return { ...state, isMuted: true, prevVolume: state.volume, volume: 0 }
    case VIDEO_UNMUTE:
      return {
        ...state,
        isMuted: false,
        volume: state.prevVolume <= 4 ? 50 : state.prevVolume,
      }
    case VIDEO_UPDATE_AUDIO:
      return {
        ...state,
        isMuted: false,
        volume: action.payload,
        prevVolume: state.volume,
      }
    case VIDEO_UPDATE_POSITION:
      return {
        ...state,
        position: action.payload,
      }
    case VIDEO_SET_PLAYER:
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
  const [videoState, videoDispatch] = React.useReducer(videoReducer, {
    volume: 50,
    prevVolume: 50,
    isMuted: false,
    isPlaying: false,
    position: 0,
    error: null,
    player: null,
    width: 0,
    height: 0,
  })
  const videoRef = React.useRef()

  React.useEffect(() => {
    videoDispatch({
      type: VIDEO_SET_SIZE,
      payload: {
        width: videoRef.current.offsetWidth - 5,
        height: videoRef.current.offsetHeight - 8,
      },
    })
    localStorage.debug = "youtube-player:*"

    const player = YouTubePlayer("playerIFrame", {
      height: videoState.height,
      width: videoState.width,
      playerVars: {
        controls: 0,
        disablekb: 1,
        enablejsapi: 1,
        modestbranding: 1,
        origin: "http://localhost:3000",
        showinfo: 0,
        iv_load_policy: 0,
      },
    })
    videoDispatch({ type: VIDEO_SET_PLAYER, payload: player })
  }, [])

  return (
    <div className="m-4">
      <div>
        <h2 className="text-xl font-bold">Title</h2>
        <div
          ref={videoRef}
          className="relative w-full h-48 border border-b-4 border-l-4 border-gray-500 shadow-xl"
        >
          <div id="player" className="" style={{ pointerEvents: "none" }}>
            <iframe
              id="playerIFrame"
              width={videoState.width}
              height={videoState.height}
              src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&modestbranding=1&controls=0disablekb=1&iv_load_policy=3&showinfo=0"
              frameBorder="0"
            ></iframe>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            onChange={e =>
              videoDispatch({
                type: VIDEO_UPDATE_POSITION,
                payload: e.target.value,
              })
            }
            value={videoState.position}
            className="absolute bottom-0 w-full h-1 my-0 progress"
          />
          {/* <div
            className="absolute bottom-0 h-1 bg-red-800"
            style={{ width: videoState.position }}
            id="progressBar"
          ></div> */}
        </div>
        <div className="flex flex-row">
          <div className="flex items-center">
            {videoState.isPlaying ? (
              <PauseButton
                onClick={() => videoDispatch({ type: VIDEO_PAUSE })}
              />
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
              <SoundButton
                onClick={() => videoDispatch({ type: VIDEO_MUTE })}
              />
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
        </div>
      </div>
      <div>Description</div>
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

export default Player
