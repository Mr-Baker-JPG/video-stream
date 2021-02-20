import React from "react"
import absoluteUrl from "next-absolute-url"
import ReactPlayer from "react-player/youtube"
import screenfull from "screenfull"
import { findDOMNode } from "react-dom"

function useCurrentWidth() {
  const getWidth = () =>
    window
      ? window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      : false
  // save current window width in the state object
  let [width, setWidth] = React.useState(0)

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  React.useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId)
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 150)
    }
    // set resize listener
    window.addEventListener("resize", resizeListener)

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener("resize", resizeListener)
    }
  }, [])

  return width
}

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
const VIDEO_START_SEEKING = "VIDEO_START_SEEKING"
const VIDEO_STOP_SEEKING = "VIDEO_STOP_SEEKING"
const VIDEO_SEEKING = "VIDEO_SEEKING"

const videoReducer = (state, action) => {
  switch (action.type) {
    case VIDEO_TOGGLE_PLAY:
      // state.player.player.player.hideVideoInfo()
      if (state.isPlaying) {
        return { ...state, isPlaying: false, wasPlaying: true }
      } else {
        return { ...state, isPlaying: true, wasPlaying: false }
      }
    case VIDEO_PLAY:
      if (state.player) {
        return { ...state, isPlaying: true, wasPlaying: false, position: "78%" }
      }
      return { ...state }
    case VIDEO_PAUSE:
      if (state.player) {
        return { ...state, isPlaying: false, wasPlaying: true }
      }
      return { ...state }
    case VIDEO_MUTE:
      return {
        ...state,
        isMuted: true,
        volume: 0,
        prevVolume: Number(state.volume),
      }
    case VIDEO_UNMUTE:
      return {
        ...state,
        isMuted: false,
        volume: state.prevVolume,
      }
    case VIDEO_UPDATE_AUDIO:
      return {
        ...state,
        isMuted: false,
        volume: Number(action.payload),
        prevVolume: Number(action.payload),
      }
    case VIDEO_START_SEEKING:
      return {
        ...state,
        seeking: true,
        isPlaying: false,
        wasPlaying: state.isPlaying,
      }
    case VIDEO_SEEKING:
      return {
        ...state,
        position: action.payload,
        seeking: true,
      }
    case VIDEO_STOP_SEEKING:
      console.log("STOP SEEKING", state)
      return {
        ...state,
        position: action.payload,
        seeking: false,
        isPlaying: state.wasPlaying,
      }
    case VIDEO_UPDATE_POSITION:
      // console.log("UPDATE", state.seeking, action.payload)
      return state.seeking
        ? state
        : {
            ...state,
            position: action.payload.played,
            loaded: action.payload.loaded || state.loaded,
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

/*
  FULLSCREEN Click
  - 1.777777778 is the ratio
  
  * 
*/

const Player = ({ videoId, setIsPlaying }) => {
  const [loaded, setLoaded] = React.useState(false)
  const [player, setPlayer] = React.useState(null)
  const width = useCurrentWidth()
  const [previousWidth, setPreviousWidth] = React.useState(0)
  const [videoState, videoDispatch] = React.useReducer(videoReducer, {
    volume: 0.8,
    prevVolume: 0.8,
    isMuted: false,
    isPlaying: false,
    wasPlaying: false,
    loaded: 0,
    position: 0,
    seeking: false,
    error: null,
    player: null,
    width: 0,
    height: 0,
  })

  const playerRef = player => {
    setPlayer(player)
  }
  const coverRef = React.useRef()
  const videoWrapperRef = React.useRef()

  // React.useEffect(() => {
  //   loadYouTube(() => {
  //     setLoaded(true)
  //     window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady
  //   })

  //   return () => videoState.player.destroy()
  // }, [videoId])

  // React.useEffect(() => {
  //   videoDispatch({ type: VIDEO_SET_PLAYER, payload: playerRef.current.player })
  // }, [])

  React.useEffect(() => {}, [player])

  const toggleVideoPlay = () => {
    setIsPlaying(state => !state)
    videoDispatch({ type: VIDEO_TOGGLE_PLAY })
  }

  const playVideo = () => {
    setIsPlaying(true)
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

  React.useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        if (screenfull.isFullscreen) {
          coverRef.current.style.position = "relative"
          videoWrapperRef.current.style.position = "relative"
          videoWrapperRef.current.style.width = "100%"
          const height = calculateHeight(videoWrapperRef.current.offsetWidth)
          videoWrapperRef.current.style.height = `${height}px`
          videoWrapperRef.current.style.top = `${
            (window.outerHeight - height) / 2
          }px`
        } else {
          videoWrapperRef.current.style.top = "0px"
          if (!screenfull.isFullscreen) handleResize(previousWidth)
        }
        // console.log("Am I fullscreen?", screenfull.isFullscreen ? "Yes" : "No")
      })
    }
  }, [])

  const calculateHeight = width => width / 1.77777778
  const handleResize = (width = false) => {
    if (!width) {
      width = coverRef.current.offsetWidth
    }
    if (!screenfull.isFullscreen && previousWidth > 0) {
      width = previousWidth
    }
    const height = calculateHeight(width)
    videoWrapperRef.current.style.height = `${height}px`
    videoWrapperRef.current.style.width = `${width}px`
    if (screenfull.isFullscreen) {
      videoWrapperRef.current.style.top = `${
        (window.outerHeight - height) / 2
      }px`
    } else {
      videoWrapperRef.current.style.top = 0
      console.log(coverRef.current.offsetWidth, previousWidth)
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [width])

  const handleFullScreen = () => {
    console.log("setting width", coverRef.current.offsetWidth)
    setPreviousWidth(coverRef.current.offsetWidth)

    screenfull.request(findDOMNode(coverRef.current))
  }

  const handleProgress = state => {
    videoDispatch({
      type: VIDEO_UPDATE_POSITION,
      payload: { played: state.played, loaded: state.loaded },
    })
  }

  const handleDuration = duration => {
    // console.log("onDuration", duration)
  }

  const handleSeekMouseDown = e => {
    console.log("PRESSED MOUSE @", Math.round(e.target.value * 100) + "%")
    videoDispatch({ type: VIDEO_START_SEEKING })
  }

  const handleSeekChange = e => {
    console.log("SEEKED @", Math.round(e.target.value * 100) + "%")
    videoDispatch({ type: VIDEO_SEEKING, payload: e.target.value })
  }

  const handleSeekMouseUp = e => {
    console.log("LIFED MOUSE @", Math.round(videoState.position * 100) + "%")
    videoDispatch({ type: VIDEO_STOP_SEEKING, payload: e.target.value })
    player.seekTo(parseFloat(videoState.position))
  }

  return (
    <div>
      <div
        ref={coverRef}
        className="relative w-full bg-gray-900 md:w-full lg:w-full"
      >
        <div
          onClick={toggleVideoPlay}
          className="absolute z-50 w-full h-full"
        ></div>
        <div ref={videoWrapperRef} className="video-wrapper">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            // onPlay={}
            // onPause={}
            ref={playerRef}
            onReady={onReady}
            played={videoState.played}
            playing={videoState.isPlaying}
            volume={videoState.volume}
            muted={videoState.isMuted}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onSeek={e => console.log("onSeek", e)}
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
                  origin: process.env.NEXT_PUBLIC_ORIGIN,
                  rel: 0,
                },
              },
            }}
          />
        </div>
      </div>
      {/* <div className="relative w-full p-0 m-0 bg-gray-600">
        <input
          name="videoSeeker"
          value={videoState.position}
          min={0}
          max={0.999999}
          step="any"
          onMouseDown={handleSeekMouseDown}
          onChange={handleSeekChange}
          onMouseUp={handleSeekMouseUp}
          type="range"
          className="w-full seek"
        />
        <label class="hidden" htmlFor="videoSeeker">
          Video Seeker
        </label>
      </div> */}
      {/* TODO: Fixing the seeker */}
      <div
        className="relative z-50 w-full h-1 pt-0 bg-white cursor-pointer group "
        onClick={e =>
          videoDispatch({
            type: VIDEO_UPDATE_POSITION,
            payload: {
              played: e.nativeEvent.offsetX / e.target.offsetWidth,
              loaded: player.loaded,
            },
          })
        }
      >
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-pink-200 ">
          <div
            style={{
              width: `${Math.round(videoState.position * 1000000) / 10000}%`,
            }}
            className="flex flex-col justify-center text-center text-white bg-pink-500 shadow-none whitespace-nowrap"
          ></div>
          <div
            className="absolute flex items-center w-3 h-3 m-0 bg-pink-500 rounded-full opacity-0 group-hover:opacity-100 "
            style={{
              bottom: "2px",
              left: `${Math.round(videoState.position * 1000000) / 10000 - 1}%`,
            }}
          ></div>
          <div
            style={{
              width: `${Math.round(videoState.loaded * 1000000) / 10000}%`,
            }}
            className="flex flex-col justify-center text-center text-white bg-gray-500 shadow-none whitespace-nowrap"
          ></div>
        </div>
      </div>
      {/* {Math.round(videoState.position * 10000) / 100 + "%"} */}
      <div className="flex justify-between w-full py-1">
        <div className="flex flex-row w-full space-x-2">
          <div className="flex items-center">
            {videoState.isPlaying ? (
              <PauseButton
                onClick={() => videoDispatch({ type: VIDEO_PAUSE })}
              />
            ) : (
              <PlayButton onClick={() => videoDispatch({ type: VIDEO_PLAY })} />
            )}
          </div>
          <div className="flex items-center space-x-1">
            {videoState.volume <= 0.001 || videoState.isMuted ? (
              <MutedButton
                onClick={() => videoDispatch({ type: VIDEO_UNMUTE })}
              />
            ) : (
              <SoundButton
                onClick={() => videoDispatch({ type: VIDEO_MUTE })}
              />
            )}
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
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
        <div className="flex items-center justify-end w-full ">
          <FullScreenButton onClick={handleFullScreen} />
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

const FullScreenButton = ({ onClick }) => (
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
