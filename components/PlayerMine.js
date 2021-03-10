import React from "react"
import absoluteUrl from "next-absolute-url"
import ReactPlayer from "react-player/youtube"
import screenfull from "screenfull"
import { findDOMNode } from "react-dom"

import PlayButton from "components/buttons/Play"
import SoundButton from "components/buttons/Sound"
import FullScreenButton from "components/buttons/FullScreen"
import MutedButton from "components/buttons/Muted"
import PauseButton from "components/buttons/Pause"

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
      return { ...state, isPlaying: true, wasPlaying: false }
    case VIDEO_PAUSE:
      return { ...state, isPlaying: false, wasPlaying: true }

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
      state.player.current.seekTo(action.payload)
      return {
        ...state,
        position: action.payload,
        seeking: true,
      }
    case VIDEO_STOP_SEEKING:
      state.player.current.seekTo(action.payload)
      return {
        ...state,
        position: action.payload,
        seeking: false,
        isPlaying: state.wasPlaying,
      }
    case VIDEO_UPDATE_POSITION:
      return state.seeking
        ? state
        : {
            ...state,
            position: action.payload.played,
            loaded: action.payload.loaded || state.loaded,
          }
    case VIDEO_SET_PLAYER:
      return {
        ...state,
        player: action.payload.player,
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

const Player = ({ videoId, forcePlay, setIsPlaying, setTime = () => {} }) => {
  const [loaded, setLoaded] = React.useState(false)
  const [player, setPlayer] = React.useState(null)
  const [displaySeeker, setDisplaySeeker] = React.useState(false)
  const pRef = React.useRef()
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
    player: pRef,
    width: 0,
    height: 0,
  })

  const playerRef = p => {
    if (!player) {
      videoDispatch({ type: VIDEO_SET_PLAYER, payload: { player: p } })
    }
    setPlayer(p)
  }
  const coverRef = React.useRef()
  const videoWrapperRef = React.useRef()

  // React.useEffect(() => {
  //   let timer = setInterval(() => {
  //     console.log("checking...")
  //   }, 1000)
  //   return () => {
  //     clearTimeout(timer)
  //     timer = null
  //   }
  // }, [])

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
    if (forcePlay) {
      setIsPlaying(true)
      videoDispatch({ type: VIDEO_PLAY })
    } else {
      setIsPlaying(false)
      videoDispatch({ type: VIDEO_PAUSE })
    }
  }, [forcePlay])

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
    }
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()
    return () => window.removeEventListener("resize", handleResize)
  }, [width])

  const handleFullScreen = () => {
    setPreviousWidth(coverRef.current.offsetWidth)

    screenfull.request(findDOMNode(coverRef.current))
  }

  const handleProgress = state => {
    setTime(Math.round(state.playedSeconds))
    videoDispatch({
      type: VIDEO_UPDATE_POSITION,
      payload: { played: state.played, loaded: state.loaded },
    })
  }

  const handleDuration = duration => {
    // console.log("onDuration", duration)
  }

  const handleSeekMouseDown = e => {
    videoDispatch({ type: VIDEO_START_SEEKING })
  }

  const handleSeekChange = e => {
    videoDispatch({ type: VIDEO_SEEKING, payload: parseFloat(e.target.value) })
    // videoDispatch({
    //   type: VIDEO_UPDATE_POSITION,
    //   payload: parseFloat(e.target.value),
    // })
  }

  const handleSeekMouseUp = e => {
    videoDispatch({
      type: VIDEO_STOP_SEEKING,
      payload: parseFloat(e.target.value),
    })
    player.seekTo(parseFloat(parseFloat(e.target.value)))
    // videoDispatch({
    //   type: VIDEO_UPDATE_POSITION,
    //   payload: parseFloat(e.target.value),
    // })
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
            ref={pRef}
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
                  enablejsapi: 1,
                  modestbranding: 1,
                  origin: process.env.NEXT_PUBLIC_ORIGIN,
                  rel: 0,
                },
              },
            }}
          />
        </div>
      </div>
      <div className="relative w-full h-6 p-0 m-0 bg-gray-600">
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
          className={` w-full rounded-none audio other`} // seek
        />
        <label className="hidden" htmlFor="videoSeeker">
          Video Seeker
        </label>
      </div>
      {/* TODO: Fixing the seeker */}
      {/* <div className="relative z-50 w-full h-1 pt-0 bg-white cursor-pointer group ">
        <div className="flex h-2 mb-4 overflow-hidden text-xs bg-pink-200 ">
          <div
            style={{
              width: `${Math.round(videoState.position * 1000000) / 10000}%`,
            }}
            className="flex flex-col justify-center text-center text-white bg-pink-500 shadow-none whitespace-nowrap"
          ></div>
          <div
            onMouseDown={handleSeekMouseDown}
            onChange={handleSeekChange}
            onMouseUp={handleSeekMouseUp}
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
      </div> */}
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

export default Player
