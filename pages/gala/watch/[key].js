import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import YouTube from "react-youtube"
import ReactPlayer from "react-player/youtube"

import { DB } from "../../../lib"

import styles from "../../../styles/Home.module.css"
import Header from "../../../components/Header"
import Footer from "../../../components/Footer"
import ScrollToTop from "../../../components/ScrollToTop"
import PlayerMine from "../../../components/PlayerMine"

function Watch(props) {
  // const router = useRouter()
  // const { key } = router.query
  console.log(props)
  // const id = data?.id

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <section>
        <div
          className="bg-center bg-no-repeat bg-auto bg-cover h-44 md:h-96"
          style={{ backgroundImage: "url(/images/jpg.jpg)" }}
        ></div>
      </section>
      {/* <YouTube
        videoId={id}
        onReady={_onReady}
        opts={{
          playerVars: {
            disablekb: 1,
            enablejsapi: 1,
            modestbranding: 1,
            playsinline: 1,
            loop: 1,
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            autohide: 1,
          },
        }}
      /> */}
      {/* <iframe
        width="560"
        height="315"
        src='https://www.youtube.com/embed/Yb7jFafo3x4?autoplay=1&embed_config={"primaryThemeColor":"#FF0000","relatedChannels":["UCCpY-hecoW6hn3Gx7wpVyRw","UCWJ2lWNubArHWmf3FIHbfcQ"],"relatedVideos":["FXLk2rCG1yg","Yb7jFafo3x4"],"autonav":true,"disableRelatedVideos":true}'
        frameBorder="0"
        allow="autoplay"
        allowFullScreen
      ></iframe> */}
      <PlayerMine videoId="ADY8cqXYYIw" />

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export async function getServerSideProps(context) {
  const url = "https://www.youtube.com/watch?v=ADY8cqXYYIw"
  const id = "ADY8cqXYYIw"

  const key = context.query.key
  const data = { url: url, id: id }

  if (await DB.hasActiveKey(key)) {
    return { props: { data } }
  } else {
    return { props: { err: `Key is invalid: ${key}` } }
  }
}

export default Watch
