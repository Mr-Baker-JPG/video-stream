import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import DB from "../../../lib/db"
// import prisma from "../../../lib/db/prisma"

import styles from "../../../styles/Home.module.css"
import GalaHeader from "../../../components/GalaHeader"
import Footer from "../../../components/Footer"
import ScrollToTop from "../../../components/ScrollToTop"
import PlayerMine from "../../../components/PlayerMine"
import Login from "../../../components/Login"
// import Login from "../../../components/Login"

export const getServerSideProps = async context => {
  const url = "https://www.youtube.com/watch?v=ADY8cqXYYIw"
  const id = "ADY8cqXYYIw"

  const ip =
    context.req.headers["x-real-ip"] || context.req.connection.remoteAddress

  console.log("CONTEXT", ip)
  const key = context.query.key
  // const data = { message: `Successfully logged in with: ${key}`, id: id }

  const check = await DB.checkKeyAndIp(key, ip)
  if (check.isKeyActive && check.isIpActive) {
    return { props: { isKeyActive: true, isIpActive: true, id } }
  }

  if (check.isKeyActive && !check.isIpActive) {
    // context.res.setHeader("Location", `/login`)
    return { props: { isKeyActive: true, isIpActive: false } }
  }

  return {
    props: { data: { isKeyActive: false, isIpActive: false, id: false } },
  }
}

function Watch({ isKeyActive = false, isIpActive = false, id = false }) {
  console.log({ isKeyActive, isIpActive, id })
  // const router = useRouter()
  // const { key } = router.query

  // const id = data?.id

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GalaHeader />

      {!isKeyActive || !isIpActive ? (
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold">
            Invalid {!isKeyActive ? "Key" : "Device"}
          </h2>
          {!isKeyActive ? (
            <p>
              Your key is invalid. Please check your email for the link sent to
              you. Otherwise, use the form below to have a new link emailed to
              you.
            </p>
          ) : (
            <p>
              You have attempted to log in with a different device. If you would
              like to have a new key emailed to you, please type it below.
            </p>
          )}
          <Login />
        </div>
      ) : (
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
            {id ? (
              <PlayerMine videoId={id} />
            ) : (
              <img src="/images/school.jpg" />
            )}
            <div className="flex border border-black">Sponsors</div>
          </div>
        </main>
      )}
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Watch
