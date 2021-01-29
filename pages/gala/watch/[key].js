import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
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
