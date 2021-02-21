/**
 * TODO:
 *  * This page should be ID controlled in the same way that the watch/[key] page is
 *  * All emitted socket messages should have the pw key passed with it
 */
import * as React from "react"
import socketIOClient from "socket.io-client"
import { useRouter } from "next/router"
import Switch from "react-switch"

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
  const [isForcePlay, setIsForcePlay] = React.useState(false)
  const [controlledTab, setControlledTab] = React.useState(0)

  const handleControlledTabSelect = id => {
    setControlledTab(id)
    // emit signal
  }

  const handleForcePlayToggle = () => {
    setIsForcePlay(current => !current)
    // emit signal
  }

  return (
    <div className="bg-gray-50">
      <Head>
        <title>Events :: JPG Gala</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GalaHeader />
      <div className="container h-full px-4 mx-auto mt-4 mb-8 ">
        <h1 className="text-2xl font-bold">Gala Controller</h1>
        <div className="flex flex-row items-center p-2 mb-2 space-x-2 border border-gray-300 shadow-lg">
          <div className="flex flex-row items-center pr-4 space-x-2">
            <h2>Force User Tabs: </h2>
            <div className="grid grid-cols-1 gap-2 mb-2 text-sm sm:grid-cols-3 ">
              <div
                onClick={() => handleControlledTabSelect(0)}
                className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md  cursor-pointer hover:opacity-90 ${
                  controlledTab === 0 && "opacity-80"
                }`}
              >
                <p>LiveStream</p>
              </div>
              <div
                onClick={() => handleControlledTabSelect(1)}
                className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md  cursor-pointer hover:opacity-90 ${
                  controlledTab === 1 && "opacity-80"
                }`}
              >
                Program
              </div>
              <div
                onClick={() => handleControlledTabSelect(2)}
                className={`flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md  cursor-pointer hover:opacity-90 ${
                  controlledTab === 2 && "opacity-80"
                }`}
              >
                Donate
              </div>
            </div>
          </div>
          <label className="flex flex-row items-center space-x-2">
            <span>Force Play:</span>
            <Switch onChange={handleForcePlayToggle} checked={isForcePlay} />
          </label>
        </div>
        <div className="grid w-full grid-cols-3 gap-2">
          <UserStatus />
          <div className="p-2 border border-gray-300 shadow-lg">
            <h2 className="font-bold">Player</h2>
            <PlayerMine setIsPlaying={setIsLive} videoId="5qap5aO4i9A" />
          </div>
          <div className="p-2 border border-gray-300 shadow-lg">
            <h2 className="font-bold">Signal Logs</h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Controller
