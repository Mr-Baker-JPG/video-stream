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

function Watch({ data: { message, id = null } }) {
  // const router = useRouter()
  // const { key } = router.query

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

      <main className="container flex flex-col px-4 mx-auto md:flex-row">
        {!id ? (
          <div>
            <h2 className="text-2xl font-bold">Invalid key</h2>
          </div>
        ) : (
          <nav className="flex w-full my-4 border border-black">
            <ul className="flex flex-col justify-between w-full">
              <li className="w-full font-light text-gray-300 from-first-blue to-last-blue bg-gradient-to-b">
                Program
              </li>
              <li className="w-full font-light text-gray-300 from-first-blue to-last-blue bg-gradient-to-b">
                Donate
              </li>
              <li className="w-full font-light text-gray-300 from-first-blue to-last-blue bg-gradient-to-b">
                JPGAcademy.org
              </li>
            </ul>
          </nav>
        )}
        <div className="flex flex-col">
          {id ? <PlayerMine videoId={id} /> : <img src="/images/school.jpg" />}
          <div className="flex border border-black">Sponsors</div>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  )
}

export async function getServerSideProps(context) {
  const url = "https://www.youtube.com/watch?v=ADY8cqXYYIw"
  const id = "ADY8cqXYYIw"

  const ip =
    context.req.headers["x-real-ip"] || context.req.connection.remoteAddress

  console.log("CONTEXT", ip)
  const key = context.query.key
  const data = { message: `Successfully logged in with: ${key}`, id: id }

  // check hasActiveKey and if IP is invalid, if IP is invalid, but key is, send to login screen
  if (await DB.hasActiveKey(key)) {
    await DB.logIp(ip)
    return { props: { data } }
  } else {
    return { props: { data: { message: `Key is invalid: ${key}` } } }
  }
}

export default Watch
