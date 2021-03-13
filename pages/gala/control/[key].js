/**
 * TODO:
 *  * This page should be ID controlled in the same way that the watch/[key] page is
 *  * All emitted socket messages should have the pw key passed with it
 */
import * as React from "react"
import { useRouter } from "next/router"

import DB from "lib/db"
import Head from "next/head"
import styles from "styles/Home.module.css"
import GalaHeader from "components/GalaHeader"
import Footer from "components/Footer"
import PlayerMine from "components/PlayerMine"
import Login from "components/Login"
import DonateForm from "components/DonateForm"
import UserStatus from "components/controller/UserStatus"
import ForcePlaySwitch from "components/controller/ForcePlaySwitch"
import ForceUserTabs from "components/controller/ForceUserTabs"
import ActivateLiveStreamSwitch from "components/controller/ActivateLiveStreamSwitch"
import useAdminSocket from "hooks/useAdminSocket"
import SignalLogs from "components/controller/SignalLogs"

export const getServerSideProps = async context => {
  const ip =
    context.req.headers["x-real-ip"] || context.req.connection.remoteAddress

  const key = context.query.key //|| "7d70903c-d303-445e-a5b6-f9631b5b6a58"

  try {
    const check = await DB.checkAdminKeyAndIp(key, ip)
    // console.log(check)
    if (check.isKeyActive && check.isIpActive) {
      return { props: { isKeyActive: true, isIpActive: true, token: key } }
    }

    if (check.isKeyActive && !check.isIpActive) {
      return { props: { isKeyActive: true, isIpActive: false, token: key } }
    }
  } catch (error) {
    // console.log(error)
  }
  return {
    props: {
      isKeyActive: false,
      isIpActive: false,
      token: key,
    },
  }
}

const Controller = ({ isKeyActive = false, isIpActive = false, token }) => {
  const [isLive, setIsLive] = React.useState(false)
  const { clients, sendUserTabs, sendToggleForcePlay, logs } = useAdminSocket(
    token
  )

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: JPG Gala :: Controller</title>
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
      ) : (
        <div className="container h-full px-4 mx-auto mt-4 mb-8 ">
          <h1 className="text-2xl font-bold">Gala Controller</h1>
          <div className="flex flex-row items-center p-2 mb-2 space-x-2 border border-gray-300 shadow-lg">
            <ForceUserTabs onToggle={sendUserTabs} />
            {/* <ForcePlaySwitch onToggle={sendToggleForcePlay} /> */}
            <ActivateLiveStreamSwitch socket={clients} />
          </div>
          <div className="grid w-full grid-cols-3 gap-2 ">
            <UserStatus clients={clients} />
            <div className="p-2 border border-gray-300 shadow-lg">
              <h2 className="font-bold">Player</h2>
              <PlayerMine setIsPlaying={setIsLive} videoId="5qap5aO4i9A" />
            </div>
            <SignalLogs logs={logs} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Controller
