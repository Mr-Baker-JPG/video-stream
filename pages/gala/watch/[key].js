import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import DB from "lib/db"
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs"
import socketIOClient from "socket.io-client"
// import Pusher from "pusher-js"

import styles from "styles/Home.module.css"
import PlayingIcon from "components/icons/Play"
import GalaHeader from "components/GalaHeader"
import GalaContent from "components/GalaContent"
import Footer from "components/Footer"
import ScrollToTop from "components/ScrollToTop"
import PlayerMine from "components/PlayerMine"
import Login from "components/Login"
import DonateForm from "components/DonateForm"

// import Login from "../../../components/Login"

export const getServerSideProps = async context => {
  const ip =
    context.req.headers["x-real-ip"] || context.req.connection.remoteAddress

  const key = context.query.key // || "7d70903c-d303-445e-a5b6-f9631b5b6a58"

  try {
    const check = await DB.checkKeyAndIp(key, ip)
    if (check.isKeyActive && check.isIpActive) {
      return {
        props: {
          isKeyActive: true,
          isIpActive: true,
          token: key,
          email: check.email,
        },
      }
    }

    if (check.isKeyActive && !check.isIpActive) {
      return {
        props: {
          isKeyActive: true,
          isIpActive: false,
          token: key,
          email: check.email,
        },
      }
    }
  } catch (error) {
    // console.log(error)
  }
  return {
    props: {
      isKeyActive: false,
      isIpActive: false,
      token: key,
      email: "",
    },
  }
}

function Watch({
  isKeyActive = false,
  isIpActive = false,
  id = false,
  token,
  email,
}) {
  const isLive = false

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: JPG Gala</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GalaHeader />
      {!isKeyActive || !isIpActive ? (
        <div className="container p-4 mx-auto sm:px-8 lg:w-1/2">
          <h2 className="text-2xl font-bold">
            Invalid {!isKeyActive ? "Key" : "Device"}
          </h2>
          {!isKeyActive ? (
            <p className="">
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
      ) : isLive ? (
        <GalaContent token={token} email={email} />
      ) : (
        <main className="container grid grid-cols-1 p-4 px-4 mx-auto mb-12 ">
          <h2 className="text-2xl">
            Check back on March 13, 2020 for the livestream.
          </h2>
        </main>
      )}

      <Footer />
    </div>
  )
}

export default Watch
