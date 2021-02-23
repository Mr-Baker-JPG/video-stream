import React from "react"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import DB from "../../../lib/db"
import { Tab, Tabs, TabList, TabPanel, resetIdCounter } from "react-tabs"
import socketIOClient from "socket.io-client"
// import Pusher from "pusher-js"

import styles from "../../../styles/Home.module.css"
import GalaHeader from "../../../components/GalaHeader"
import Footer from "../../../components/Footer"
import ScrollToTop from "../../../components/ScrollToTop"
import PlayerMine from "../../../components/PlayerMine"
import Login from "../../../components/Login"
import DonateForm from "../../../components/DonateForm"

const GalaContent = () => {
  return (
    <div className="container h-full px-4 mx-auto my-8 md:px-0">
      <Tabs
        onSelect={handleTabSelect}
        selectedIndex={tabIndex}
        className="flex flex-col md:space-x-8 md:flex-row lg:mx-8"
        forceRenderTabPanel={true}
      >
        <TabList className="grid grid-cols-1 mb-2 text-sm sm:grid-cols-4 md:mb-0 md:flex md:w-min-300 md:flex-col md:space-y-2">
          <Tab>
            <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90">
              <p>LiveStream</p>
              {isLive ? <PlayingIcon className="text-green-600" /> : null}
            </div>
          </Tab>
          <Tab>
            <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90">
              Program
            </div>
          </Tab>
          <Tab>
            <div className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90">
              Donate
            </div>
          </Tab>
          <li>
            <a
              target="_blank"
              href="https://jpgacademy.org/"
              className="flex flex-row items-center justify-between px-4 py-2 text-gray-300 bg-blue-900 border rounded-md shadow-xl cursor-pointer hover:opacity-90"
            >
              JPGAcademy.org
            </a>
          </li>
        </TabList>
        <div className="w-full">
          <TabPanel>
            <PlayerMine
              setTime={setTime}
              setIsPlaying={setIsLive}
              videoId="5qap5aO4i9A"
            />
            <div className="flex border border-black">Sponsors</div>
          </TabPanel>
          <TabPanel>Programming</TabPanel>
          <TabPanel>
            <DonateForm />
          </TabPanel>
        </div>
      </Tabs>
    </div>
  )
}

export default GalaContent
