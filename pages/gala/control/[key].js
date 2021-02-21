/**
 * TODO:
 *  * This page should be ID controlled in the same way that the watch/[key] page is
 *  * All emitted socket messages should have the pw key passed with it
 */
import * as React from "react"
import socketIOClient from "socket.io-client"
import { useRouter } from "next/router"
import DB from "../../../lib/db"
import Head from "next/head"
import styles from "../../../styles/Home.module.css"
import GalaHeader from "../../../components/GalaHeader"
import Footer from "../../../components/Footer"
import ScrollToTop from "../../../components/ScrollToTop"
import PlayerMine from "../../../components/PlayerMine"
import Login from "../../../components/Login"
import DonateForm from "../../../components/DonateForm"
import UserStatus from "../../../components/UserStatus"

const Controller = () => {
  const [isLive, setIsLive] = React.useState(false)
  const [controlledTab, setControlledTab] = React.useState(0)

  const handleControlledTabSelect = id => {
    setControlledTab(id)
    // emit signal
  }

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: JPG Gala</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GalaHeader />
      <div className="container h-full px-4 mx-auto my-8 ">
        <h1>Controller</h1>
        <div className="grid grid-cols-1 gap-2 mb-2 text-sm sm:grid-cols-3 sm:w-2/3 ">
          <div
            onClick={() => handleControlledTabSelect(0)}
            className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90 ${
              controlledTab === 0 && "opacity-80"
            }`}
          >
            <p>LiveStream</p>
            {isLive ? <PlayingIcon className="text-green-600" /> : null}
          </div>
          <div
            onClick={() => handleControlledTabSelect(1)}
            className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90 ${
              controlledTab === 1 && "opacity-80"
            }`}
          >
            Program
          </div>
          <div
            onClick={() => handleControlledTabSelect(2)}
            className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90 ${
              controlledTab === 2 && "opacity-80"
            }`}
          >
            Donate
          </div>
        </div>
        <div className="grid w-full grid-cols-3 gap-2">
          <UserStatus />
          <div>Signal Logs</div>
          <PlayerMine setIsPlaying={setIsLive} videoId="5qap5aO4i9A" />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Controller
